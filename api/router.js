const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

router.get('/users', (req, res, next) => {
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




module.exports = router;
