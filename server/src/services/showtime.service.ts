import client from "../database";
import { QueryResult } from "pg";
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Middlewares = require("../middlwares");
const middlwares = new Middlewares();
class ReviewService {
  async createReviewService(userInput: any) {
    try {
      const { time } = userInput;
      const now = new Date();
      const response: QueryResult = await client.query(
        "INSERT INTO showtimes (time) VALUES ($1) RETURNING *",
        [time]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Create Show time Successfully!`,
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
  async getShowTimeService() {
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM showtimes"
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get Show time successfully!`,
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

  async getReviewIdService(ticketInput: any) {
    const { id } = ticketInput;
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM reviews WHERE id = $1 ",
        [id]
      );

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get Reviews successfully!`,
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

  async getTicketMovieService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM reviews JOIN movies ON reviews.id = movies.movies_id WHERE reviews.id = $1",
        [id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Delete Movie Id ${id} successfully!`,
        data: response.rows,
      };
    } catch (error) {
      return error;
    }
  }

  async deleteReviewUserService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "DELETE FROM reviews WHERE id = $1",
        [id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Delete Movie Id ${id} successfully!`,
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

  async updateReviewUserService(userInput: any) {
    const { id, description, rating, userName } = userInput;
    try {
      const response: QueryResult = await client.query(
        "UPDATE reviews SET description = $1 , rating = $2  WHERE id = $3",
        [description, rating, id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Update Review Id ${id} successfully!`,
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
module.exports = ReviewService;
