import client from "../database";
import { QueryResult } from "pg";
import { TimeCountMovie } from "../entity";
class Validations {
  async checkMovieExists(titleInput: any) {
    const { title } = titleInput;
    const checkExists: QueryResult = await client.query(
      "SELECT * FROM movies WHERE title = $1",
      [title]
    );
    if (checkExists.rows.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async checkIdExists(idInput: any, tableInput: any) {
    const { id } = idInput;
    const { table } = tableInput;
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM  ${table} WHERE id = $1`,
      [id]
    );
    if (checkExists.rows.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async checkTheater(timer: TimeCountMovie) {
    const query: QueryResult = await client.query(
      "SELECT * FROM movies WHERE movies_id = $1",
      [timer.id]
    );
  }
}

module.exports = Validations;
