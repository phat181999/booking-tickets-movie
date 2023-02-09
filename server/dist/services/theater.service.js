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
class TheaterService {
    createTheaterService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nameTheater, seat_id, showTimes_id } = userInput;
                const response = yield database_1.default.query("INSERT INTO theaters (nameTheater, seat_id, showTimes_id ) VALUES ($1, $2, $3) RETURNING *", [nameTheater, seat_id, showTimes_id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Create Theater Successfully!`,
                    data: response.rows,
                };
            }
            catch (error) {
                return {
                    status: STATUS_CODES.BadRequestError,
                    success: true,
                    message: `Create Reviews Successfully!`,
                    error: error,
                };
            }
        });
    }
    getTheaterUsersService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.default.query("SELECT * FROM theaters");
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
    getTheatersService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = userInput;
            try {
                const response = yield database_1.default.query("SELECT * FROM theaters INNER JOIN showtimes ON showtimes.showtime_id = theaters.showtimes_id INNER JOIN seats  ON theaters.seat_id = seats.seat_id WHERE theaters.theater_id = $1", [id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Create Show time Successfully!`,
                    data: response.rows,
                };
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteTheaterUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = userInput;
            try {
                const response = yield database_1.default.query("DELETE FROM theaters WHERE id = $1", [id]);
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
    updateTheaterUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nameTheater, seat } = userInput;
            console.log(id);
            try {
                const response = yield database_1.default.query("UPDATE theaters SET nameTheater = $1 , seat = $2 WHERE id = $3", [nameTheater, seat, id]);
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
}
module.exports = TheaterService;
