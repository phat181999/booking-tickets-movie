import client from "../database";
import { QueryResult } from "pg";
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Middlewares = require("../middlwares");
const middlwares = new Middlewares();
class ReviewService {
  async createReviewService(userInput: any) {
    try {
      const { description, rating, userName_id, reviewMovie_id } = userInput;
      const response: QueryResult = await client.query(
        "INSERT INTO reviews (description, rating, userName_id, reviewMovie_id ) VALUES ($1, $2, $3, $4) RETURNING *",
        [description, rating, userName_id, reviewMovie_id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Create Reviews Successfully!`,
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
  async getReviewsService() {
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM reviews  ORDER BY id ASC"
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

  async getReviewIdService(ticketInput: any) {
    const { id } = ticketInput;
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM reviews WHERE review_id = $1 ",
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

  async getReviewMovieService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM reviews JOIN movies ON reviews.review_id = movies.movies_id WHERE reviews.review_id = $1",
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
