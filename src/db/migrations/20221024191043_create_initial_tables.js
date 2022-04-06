exports.up = function (knex, Promise) {
    return knex.raw(`
      CREATE TABLE IF NOT EXISTS categories
      (
          id int NOT NULL AUTO_INCREMENT,
          name varchar(125),
          created_at timestamp(0) NOT NULL DEFAULT NOW(),
          updated_at timestamp(0) NOT NULL DEFAULT NOW(),
          PRIMARY KEY (id)
      );

      CREATE TABLE IF NOT EXISTS products
      (
          id int NOT NULL AUTO_INCREMENT,
          category_id int NOT NULL,
          name varchar(125),
          quantity int NOT NULL,
          price int NOT NULL,
          sku varchar(100) NOT NULL,
          created_at timestamp(0) NOT NULL DEFAULT NOW(),
          updated_at timestamp(0) NOT NULL DEFAULT NOW(),
          PRIMARY KEY (id),
          FOREIGN KEY (category_id) REFERENCES categories(id)
      );

      CREATE TABLE IF NOT EXISTS carts
      (
          id int NOT NULL AUTO_INCREMENT,
          created_at timestamp(0) NOT NULL DEFAULT NOW(),
          updated_at timestamp(0) NOT NULL DEFAULT NOW(),
          PRIMARY KEY (id)
      );

      CREATE TABLE IF NOT EXISTS cart_item
      (
          id int NOT NULL AUTO_INCREMENT,
          cart_id int NOT NULL,
          product_id int NOT NULL,
          quantity integer NOT NULL,
          created_at timestamp(0) NOT NULL DEFAULT NOW(),
          updated_at timestamp(0) NOT NULL DEFAULT NOW(),
          PRIMARY KEY (id),
          FOREIGN KEY (cart_id) REFERENCES carts(id),
          FOREIGN KEY (product_id) REFERENCES products(id)
      );
  `)
}

exports.down = function (knex, Promise) {
    return knex.raw(`
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS cart_item;
  `)
}
