
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', (table) => {
      table.increments();
      table.text('name').notNullable();
      table.text('genre').notNullable();
      table.text('developer').notNullable();
      table.integer('user_id').references('users.id').unsigned().onDelete('cascade');
    })


};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games');
};
