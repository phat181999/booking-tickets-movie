import client from "../database";
import { QueryResult } from "pg";

class TheaterService {
  async createTheaterService(userInput: any) {
    try {
      const { nameTheater, seat } = userInput;
      const response: QueryResult = await client.query(
        "INSERT INTO theaters (nameTheater, seat) VALUES ($1, $2)",
        [nameTheater, seat]
      );
      return response;
    } catch (error) {
      return error;
    }
  }
  async getTheaterUsersService() {
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM theaters  ORDER BY id ASC"
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
        "SELECT * FROM theaters WHERE id = $1",
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
        "DELETE FROM theaters WHERE id = $1",
        [id]
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateTheaterUserService(userInput: any) {
    const { id, nameTheater, seat } = userInput;
    console.log(id);
    try {
      const response: QueryResult = await client.query(
        "UPDATE theaters SET nameTheater = $1 , seat = $2 WHERE id = $3",
        [nameTheater, seat, id]
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}
module.exports = TheaterService;
