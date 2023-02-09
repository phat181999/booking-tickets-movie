import client from "../database";
import { QueryResult } from "pg";
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
class TheaterService {
  async createTheaterService(userInput: any) {
    try {
      const { nameTheater, seat_id, showTimes_id } = userInput;

      const response: QueryResult = await client.query(
        "INSERT INTO theaters (nameTheater, seat_id, showTimes_id ) VALUES ($1, $2, $3) RETURNING *",
        [nameTheater, seat_id, showTimes_id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Create Theater Successfully!`,
        data: response.rows,
      };
    } catch (error) {
      return {
        status: STATUS_CODES.BadRequestError,
        success: true,
        message: `Create Reviews Successfully!`,
        error: error,
      };
    }
  }

  async getTheaterUsersService() {
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM theaters"
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async getTheatersService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM theaters INNER JOIN showtimes ON showtimes.showtime_id = theaters.showtimes_id INNER JOIN seats  ON theaters.seat_id = seats.seat_id WHERE theaters.theater_id = $1",
        [id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Create Show time Successfully!`,
        data: response.rows,
      };
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
