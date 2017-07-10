const knex = require('./knex');

module.exports = {
	getAll() {
		return knex('users');
	},
	getUserById(id) {
		return knex('users').where('id', id);
	},
	getUserGames(id) {
		return knex('games').where('user_id', id);
	},
	addUserGame(game) {
		return knex('games').insert(game, '*');
	},
	getUserByEmail(email) {
		return knex('users').where('email', email).first();
	},
	createUser(user) {
		return knex('users').insert(user, 'id').then(id => {
			return id[0];
		});
	},
	updateUser(user, id) {
		return knex('users').where('id', id).update(user);
	},
	deleteUser(id) {
		return knex('users').where('id', id).del();
	}
};
