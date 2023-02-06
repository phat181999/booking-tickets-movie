import { Pool } from "pg";
require("dotenv").config();

const client = new Pool({
  user: process.env.DB_USERNAME,
  host: "localhost",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 5432,
});

export default client;
