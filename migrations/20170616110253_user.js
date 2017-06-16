	exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', (table) => {
		table.increments();
		table.text('email').notNullable();
		table.text('password').notNullable();
		table.dateTime('created_at').defaultTo(knex.fn.now());
		table.boolean('is_active').defaultTo(true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users');
};
