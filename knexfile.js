require('dotenv').config({path: '../.env'});

const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

module.exports =  {
  development: {
    client: 'mysql',
    connection: {
      database: DB_DATABASE,
      user: DB_USER,
      password: DB_PASSWORD,
      host : DB_HOST,
      port : DB_PORT,
      multipleStatements: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds'
    },
    debug: true
  },
};
