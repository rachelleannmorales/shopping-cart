import {Request, Response} from "express";

const express = require("express");
const app = express();

require('dotenv').config()

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.json("test");
});
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});