import { Pool } from "pg";

const client = new Pool({
  user: "postgres",
  host: "localhost",
  password: "tanphat99",
  database: "movie",
  port: 5432,
});

export default client;
