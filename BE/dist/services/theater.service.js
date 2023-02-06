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
class TheaterService {
    createTheaterService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nameTheater, seat } = userInput;
                const response = yield database_1.default.query("INSERT INTO theaters (nameTheater, seat) VALUES ($1, $2)", [nameTheater, seat]);
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
    getTheaterUsersService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.default.query("SELECT * FROM theaters  ORDER BY id ASC");
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
    getTheaterUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = userInput;
            try {
                const response = yield database_1.default.query("SELECT * FROM theaters WHERE id = $1", [id]);
                return response;
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
