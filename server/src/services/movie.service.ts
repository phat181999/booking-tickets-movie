import client from "../database";
import { QueryResult } from "pg";
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Middlewares = require("../middlwares");

class MovieService {
  async createTicketService(userInput: any) {
    try {
      const { title, director, description, type, trailer, avatar, timeCount } =
        userInput;

      const response: QueryResult = await client.query(
        "INSERT INTO movies (title, director, description, type, trailer, avatar, timeCount) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [title, director, description, type, trailer, [avatar], timeCount]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Create Movie Successfully!`,
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

  async getMoviesService() {
    try {
      const response: QueryResult = await client.query("SELECT * FROM movies");
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get Movies successfully!`,
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

  async getMovieIdService(ticketInput: any) {
    const { id } = ticketInput;
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM movies WHERE id = $1 ",
        [id]
      );

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get Movie successfully!`,
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

  async deleteMovieUserService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "DELETE FROM movies WHERE id = $1",
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

  async updateMovieUserService(userInput: any) {
    const { id, title, director, description, type, trailer, avatar } =
      userInput;
    try {
      const response: QueryResult = await client.query(
        "UPDATE movies SET title = $1 , director = $2, description = $3, type = $4, trailer = $5, avatar = $6 WHERE id = $7",
        [title, director, description, type, trailer, avatar, id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Update Movie Id ${id} successfully!`,
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
module.exports = MovieService;
