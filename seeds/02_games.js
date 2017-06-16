const games = require('../gamedata')


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE games RESTART IDENTITY CASCADE;')
  .then(function () {
    return knex('games').insert(games);
  })
};
