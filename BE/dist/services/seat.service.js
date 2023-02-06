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
class Seatervice {
    createSeatService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { row, seatNumber } = userInput;
                const response = yield database_1.default.query("INSERT INTO seats (row, seatNumber ) VALUES ($1, $2) RETURNING *", [row, seatNumber]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Create Seat Successfully!`,
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
    getSeatsService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.default.query("SELECT * FROM seats  ORDER BY id ASC");
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Get Seats successfully!`,
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
    getSeatIdService(ticketInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = ticketInput;
            try {
                const response = yield database_1.default.query("SELECT * FROM seats WHERE id = $1 ", [id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Get Seats successfully!`,
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
    deleteSeatUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = userInput;
            try {
                const response = yield database_1.default.query("DELETE FROM seats WHERE id = $1", [id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Delete Seat Id ${id} successfully!`,
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
    updateSeatUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, row, seatNumber } = userInput;
            try {
                const response = yield database_1.default.query("UPDATE reviews SET row = $1 , seatNumber = $2  WHERE id = $3", [row, seatNumber, id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Update Seat Id ${id} successfully!`,
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
module.exports = Seatervice;
