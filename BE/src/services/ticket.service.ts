import client from "../database";
import { QueryResult } from "pg";
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Middlewares = require("../middlwares");
const middlwares = new Middlewares();
class TicketService {
  async createTicketService(userInput: any) {
    try {
      const { userName, showTime, totalPrice, seat } = userInput;

      var timer = new Date().toJSON();

      const response: QueryResult = await client.query(
        "INSERT INTO tickets (userName, showTime, totalPrice, seat) VALUES ($1, $2, $3, $4) RETURNING *",
        [userName, showTime, totalPrice, seat]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Create successfully!`,
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
  async getTicketsService() {
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM tickets  ORDER BY id ASC"
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get Tickets successfully!`,
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

  async getTicketIdService(ticketInput: any) {
    const { id } = ticketInput;
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM tickets WHERE id = $1",
        [id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get Ticket successfully!`,
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

  async deleteTicketUserService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "DELETE FROM tickets WHERE id = $1",
        [id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Delete Ticket successfully!`,
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

  async updateTicketUserService(userInput: any) {
    const { id, userName, showTime, totalPrice, seat } = userInput;

    try {
      const response: QueryResult = await client.query(
        "UPDATE tickets SET userName = $1 , showTime = $2, totalPrice = $3, seat = $4 WHERE id = $5",
        [userName, showTime, totalPrice, seat, id]
      );
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Update Ticket successfully!`,
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
module.exports = TicketService;
