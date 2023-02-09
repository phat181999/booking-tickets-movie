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
class BookingTheaterService {
    bookingTheaterService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.default.query("INSERT INTO bookingtheater (movie_id, theater_id, createAt, deleteAt, status ) VALUES ($1, $2, $3, $4, $5) RETURNING *", [
                    userInput.movie_id,
                    userInput.theater_id,
                    userInput.createAt,
                    userInput.deleteAt,
                    userInput.status,
                ]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Booking Theater Successfully!`,
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
    getBookingTheaterService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = userInput;
            try {
                const response = yield database_1.default.query("SELECT * FROM bookingtheater INNER JOIN movies ON  movies.movies_id = bookingtheater.movie_id INNER JOIN theaters ON  theaters.theater_id = bookingtheater.theater_id WHERE bookingtheater.bookingtheater_id = $1", [id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Get Booking Theater successfully!`,
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
    deleteBookingTheaterService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = userInput;
            try {
                const response = yield database_1.default.query("DELETE FROM bookingtheater WHERE bookingtheater_id = $1", [id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Delete bookingtheater Id ${id} successfully!`,
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
            try {
                const response = yield database_1.default.query("UPDATE bookingtheater SET theater_id = $1 , movie_id = $2, createAt = $3, deleteAt = $4, status = $5, avatar = $6 WHERE bookingtheater_id = $7", [
                    userInput.theater_id,
                    userInput.movie_id,
                    userInput.createAt,
                    userInput.deleteAt,
                    userInput.status,
                    userInput.bookingtheater_id,
                ]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Update Movie Id ${userInput.bookingtheater_id} successfully!`,
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
module.exports = BookingTheaterService;
