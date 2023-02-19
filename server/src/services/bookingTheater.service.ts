import client from "../database";
import { QueryResult } from "pg";
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
import { BookingTheater } from "../entity/bookingTheater.enity";
class BookingTheaterService {
  async bookingTheaterService(userInput: BookingTheater) {
    try {
      const response: QueryResult = await client.query(
        "INSERT INTO bookingtheater (movie_id, theater_id, createAt, deleteAt, status ) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          userInput.movie_id,
          userInput.theater_id,
          userInput.createAt,
          userInput.deleteAt,
          userInput.status,
        ]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Booking Theater Successfully!`,
        data: response.rows,
      };
    } catch (error) {
      return {
        status: STATUS_CODES.BadRequestError,
        success: false,
        message: `Internal Server Error!`,
        error: error,
      };
    }
  }

  async getBookingTheaterService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM bookingtheater INNER JOIN movies ON  movies.movies_id = bookingtheater.movie_id INNER JOIN theaters ON  theaters.theater_id = bookingtheater.theater_id WHERE bookingtheater.bookingtheater_id = $1",
        [id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get Booking Theater successfully!`,
        data: response.rows,
      };
    } catch (error) {
      return {
        status: STATUS_CODES.BadRequestError,
        success: false,
        message: `Internal Server Error!`,
        error: error,
      };
    }
  }

  async deleteBookingTheaterService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "DELETE FROM bookingtheater WHERE bookingtheater_id = $1",
        [id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Delete bookingtheater Id ${id} successfully!`,
      };
    } catch (error) {
      return {
        status: STATUS_CODES.BadRequestError,
        success: false,
        message: `Internal Server Error!`,
        error: error,
      };
    }
  }

  async updateMovieUserService(userInput: BookingTheater) {
    try {
      const response: QueryResult = await client.query(
        "UPDATE bookingtheater SET theater_id = $1 , movie_id = $2, createAt = $3, deleteAt = $4, status = $5, avatar = $6 WHERE bookingtheater_id = $7",
        [
          userInput.theater_id,
          userInput.movie_id,
          userInput.createAt,
          userInput.deleteAt,
          userInput.status,
          userInput.bookingtheater_id,
        ]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Update Movie Id ${userInput.bookingtheater_id} successfully!`,
        data: response.rows,
      };
    } catch (error) {
      return {
        status: STATUS_CODES.BadRequestError,
        success: false,
        message: `Internal Server Error!`,
        error: error,
      };
    }
  }
}
module.exports = BookingTheaterService;
