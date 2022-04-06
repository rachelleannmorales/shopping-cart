exports.up = function (knex, Promise) {
    return knex.raw(`
      INSERT INTO categories(id, name)
      VALUES (1, 'fruits'), (2, 'vegetables');
  `)
}

exports.down = function (knex, Promise) {
    return knex.raw(`
      TRUNCATE TABLE TABLE categories;
  `)
}
