import {Request, Response} from "express";

const express = require("express");
const app = express();

require('dotenv').config()

const { PORT, NODE_ENV } = process.env;
const db = require("./db/knex")(NODE_ENV);

app.use('/', require('./api/routes').router)

app.get("/", (req: Request, res: Response) => {
    res.json("test");
});
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});