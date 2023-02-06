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
class MovieService {
    createTicketService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, director, description, type, trailer, avatar } = userInput;
                const response = yield database_1.default.query("INSERT INTO movies (title, director, description, type, trailer, avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [title, director, description, type, trailer, avatar]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Create Movie Successfully!`,
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
    getMoviesService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.default.query("SELECT * FROM movies  ORDER BY id ASC");
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Get Movies successfully!`,
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
    getMovieIdService(ticketInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = ticketInput;
            try {
                const response = yield database_1.default.query("SELECT * FROM movies WHERE id = $1 ", [id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Get Movie successfully!`,
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
    deleteMovieUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = userInput;
            try {
                const response = yield database_1.default.query("DELETE FROM movies WHERE id = $1", [id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Delete Movie Id ${id} successfully!`,
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
    updateMovieUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, director, description, type, trailer, avatar } = userInput;
            try {
                const response = yield database_1.default.query("UPDATE movies SET title = $1 , director = $2, description = $3, type = $4, trailer = $5, avatar = $6 WHERE id = $7", [title, director, description, type, trailer, avatar, id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Update Movie Id ${id} successfully!`,
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
module.exports = MovieService;
