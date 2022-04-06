exports.up = function (knex, Promise) {
    return knex.raw(`
      INSERT INTO products(category_id, name, quantity, price, sku)
      VALUES (1, 'apple', 10, 5, ROUND(10000 * RAND())),
             (1, 'orange', 10, 15, ROUND(10000 * RAND())),
             (2, 'brocoli', 10, 25, ROUND(10000 * RAND())),
             (2, 'carrot', 10, 20, ROUND(10000 * RAND())),
             (1, 'avocado', 10, 10, ROUND(10000 * RAND()));
  `)
}

exports.down = function (knex, Promise) {
    return knex.raw(`
      TRUNCATE TABLE TABLE products;
  `)
}
