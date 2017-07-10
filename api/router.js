const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const queries = require('../db/queries');

const valid = require('./validate');

router.get('/users', (req, res, next) => {
	console.log(req.signedCookies);
	console.log('signed');
	queries.getAll().then(users => {
		res.json(users);
	});
});

router.get('/users/:id', (req,res,next) => {
	queries.getUserById(req.params.id).then(users => {
		res.json(users);
	});
});

router.get('/users/:id/games', (req,res,next) => {
	queries.getUserGames(req.params.id).then(games => {
		res.json(games);
	});
});

router.post('/users/:id/games', (req,res,next) => {
	queries.addUserGame(req.body).then(response => {
		res.json(response);
	});
});
router.post('/users', (req, res, next) => {
	if(valid.user(req.body)) {
		queries.getUserByEmail(req.body.email).then(user => {
			if(!user) {
				bcrypt.hash(req.body.password, 10)
					.then((hash) => {
						let user = {
							name: req.body.name,
							email: req.body.email,
							password: hash,
							created_at: new Date()
						};
						queries.createUser(user).then(id => {
							res.json({
								id,
								message: "Success"
							});
						});
					});
			} else {
				next(new Error("Email in use"));
			}
		});
	} else {
		next(new Error('Invalid User'));
	}
});


router.post('/login', (req, res, next) => {
	if(valid.user(req.body)) {
		queries.getUserByEmail(req.body.email).then(user => {
			if(user) {
				bcrypt.compare(req.body.password, user.password).then(result => {
					if(result) {
						res.cookie('user_id', user.id, {
							httpOnly: true,
							secure: req.app.get('env') != 'development',
							signed: true
						});
						console.log(user.name);
						res.json({
							message: "Success!",
							id: user.id,
							name: user.name
						});

					} else {
						next(new Error("Invalid Password"));
					}
				});

			} else {
				next(new Error("Invalid Email"))
			}

		});
	}
});

router.put('/users/:id', (req,res,next) => {
	queries.updateUser(req.body).then(user => {
		res.json(user);
	});
});

router.delete('/users/:id', (req,res,next) => {
	queries.deleteUser(req.params.id).then(response => {
		res.json(response);
	});
});




module.exports = router;
