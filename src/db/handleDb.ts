'use strict'
require('dotenv').config();
const knexMigrate = require('knex-migrate')

const handler = {

  createDb: async function () {
    const { NODE_ENV, DB_DATABASE } = process.env;
    const config = require('../../knexfile')[NODE_ENV];
    delete config.connection.database;
    const knex = require('knex')(config)
    try {
      await knex.raw('CREATE DATABASE IF NOT EXISTS ??', DB_DATABASE)
      console.log(`DB '${DB_DATABASE}' created successfully`)
    } catch (err) {
      console.log(err);
      if (err.code !== '42P04') {
        throw err
      }
    }
    process.exit(0)
  },

  migrateUp: async function () {
    await knexMigrate('up', {})
    return 'Migrated successfully'
  },

  migrateDown: async function () {
    await knexMigrate('rollback', {})
    return 'Rolled back successfully'
  },
}

module.exports = {
  createDb: handler.createDb,
  migrateUp: handler.migrateUp,
  migrateDown: handler.migrateDown
}
