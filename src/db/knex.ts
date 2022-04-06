import {Knex as TKnex} from "knex";
import {Model} from "objection";
const Knex = require("knex");
const knexConfig = require('../knexfile');

function connect(env: any) {
    const config = knexConfig[env]
    if (!config) {
        throw Error(`Database connect error: invalid environment ${env}`);
    }
    const knex: TKnex = Knex(config);
    Model.knex(knex);
    return knex;
}

module.exports = connect