const users = require('../users');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE users RESTART IDENTITY CASCADE;')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(users);
    });
};
