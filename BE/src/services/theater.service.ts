import client from "../database";
import { QueryResult } from "pg";

class TheaterService {
  async createTheaterService(userInput: any) {
    try {
      const { name, email } = userInput;
      const response: QueryResult = await client.query(
        "INSERT INTO users (name, email) VALUES ($1, $2)",
        [name, email]
      );
      return response;
    } catch (error) {
      return error;
    }
  }
  async getTheaterUsersService() {
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM users  ORDER BY id ASC"
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async getTheaterUserService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteTheaterUserService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "DELETE FROM users WHERE id = $1",
        [id]
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateTheaterUserService(userInput: any) {
    const { id, name, email } = userInput;
    console.log(id);
    try {
      const response: QueryResult = await client.query(
        "UPDATE users SET name = $1 , email = $2 WHERE id = $3",
        [name, email, id]
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}
module.exports = TheaterService;
