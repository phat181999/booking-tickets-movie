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
class ReviewService {
    createReviewService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, rating } = userInput;
                const response = yield database_1.default.query("INSERT INTO reviews (description, rating ) VALUES ($1, $2) RETURNING *", [description, rating]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Create Reviews Successfully!`,
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
    getReviewsService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.default.query("SELECT * FROM reviews  ORDER BY id ASC");
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Get Reviews successfully!`,
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
    getReviewIdService(ticketInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = ticketInput;
            try {
                const response = yield database_1.default.query("SELECT * FROM reviews WHERE id = $1 ", [id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Get Reviews successfully!`,
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
    deleteReviewUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = userInput;
            try {
                const response = yield database_1.default.query("DELETE FROM reviews WHERE id = $1", [id]);
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
    updateReviewUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, description, rating, userName } = userInput;
            try {
                const response = yield database_1.default.query("UPDATE reviews SET description = $1 , rating = $2  WHERE id = $3", [description, rating, id]);
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: `Update Review Id ${id} successfully!`,
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
module.exports = ReviewService;
