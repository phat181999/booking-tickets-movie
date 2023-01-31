"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    password: "tanphat99",
    database: "movie",
    port: 5432,
});
exports.default = client;
