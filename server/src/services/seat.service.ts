import client from "../database";
import { QueryResult } from "pg";
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Middlewares = require("../middlwares");
const middlwares = new Middlewares();
class Seatervice {
  async createSeatService(userInput: any) {
    try {
      const { row, seatNumber } = userInput;

      const response: QueryResult = await client.query(
        "INSERT INTO seats (row, seatNumber ) VALUES ($1, $2) RETURNING *",
        [row, seatNumber]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Create Seat Successfully!`,
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
  async getSeatsService() {
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM seats  ORDER BY id ASC"
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get Seats successfully!`,
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

  async getSeatIdService(ticketInput: any) {
    const { id } = ticketInput;
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM seats WHERE id = $1 ",
        [id]
      );

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get Seats successfully!`,
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

  // async getTicketUserService(userInput: any) {
  //   const { id } = userInput;
  //   try {
  //     const response: QueryResult = await client.query(
  //       "SELECT * FROM users WHERE id = $1",
  //       [id]
  //     );
  //     return response;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async deleteSeatUserService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "DELETE FROM seats WHERE id = $1",
        [id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Delete Seat Id ${id} successfully!`,
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

  async updateSeatUserService(userInput: any) {
    const { id, row, seatNumber } = userInput;
    try {
      const response: QueryResult = await client.query(
        "UPDATE reviews SET row = $1 , seatNumber = $2  WHERE id = $3",
        [row, seatNumber, id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Update Seat Id ${id} successfully!`,
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
module.exports = Seatervice;
