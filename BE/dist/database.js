"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv").config();
const client = new pg_1.Pool({
    user: process.env.DB_USERNAME,
    host: "localhost",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 5432,
});
exports.default = client;
