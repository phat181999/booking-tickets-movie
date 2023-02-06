"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Middlewares = require("../middlwares");
const middlwares = new Middlewares();
class TicketService {
    createTicketService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, showTime, totalPrice, seat } = userInput;
                var timer = new Date().toJSON();
                const response = yield database_1.default.query("INSERT INTO tickets (userName, showTime, totalPrice, seat) VALUES ($1, $2, $3, $4) RETURNING *", [userName, showTime, totalPrice, seat]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Create successfully!`,
                    data: response.rows,
                };
            }
            catch (error) {
                return {
                    status: STATUS_CODES.BadRequestError,
                    success: false,
                    message: `Internal Server Error!`,
                    error: error,
                };
            }
        });
    }
    getTicketsService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.default.query("SELECT * FROM tickets  ORDER BY id ASC");
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Get Tickets successfully!`,
                    data: response.rows,
                };
            }
            catch (error) {
                return {
                    status: STATUS_CODES.BadRequestError,
                    success: false,
                    message: `Internal Server Error!`,
                    error: error,
                };
            }
        });
    }
    getTicketIdService(ticketInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = ticketInput;
            try {
                const response = yield database_1.default.query("SELECT * FROM tickets WHERE id = $1", [id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Get Ticket successfully!`,
                    data: response.rows,
                };
            }
            catch (error) {
                return {
                    status: STATUS_CODES.BadRequestError,
                    success: false,
                    message: `Internal Server Error!`,
                    error: error,
                };
            }
        });
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
    deleteTicketUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = userInput;
            try {
                const response = yield database_1.default.query("DELETE FROM tickets WHERE id = $1", [id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Delete Ticket successfully!`,
                    data: response.rows,
                };
            }
            catch (error) {
                return {
                    status: STATUS_CODES.BadRequestError,
                    success: false,
                    message: `Internal Server Error!`,
                    error: error,
                };
            }
        });
    }
    updateTicketUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, userName, showTime, totalPrice, seat } = userInput;
            try {
                const response = yield database_1.default.query("UPDATE tickets SET userName = $1 , showTime = $2, totalPrice = $3, seat = $4 WHERE id = $5", [userName, showTime, totalPrice, seat, id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Update Ticket successfully!`,
                    data: response.rows,
                };
            }
            catch (error) {
                return {
                    status: STATUS_CODES.BadRequestError,
                    success: false,
                    message: `Internal Server Error!`,
                    error: error,
                };
            }
        });
    }
}
module.exports = TicketService;
