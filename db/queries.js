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
	}
}
