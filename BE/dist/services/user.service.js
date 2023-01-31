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
class UserService {
    createUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email } = userInput;
                const response = yield database_1.default.query("INSERT INTO users (name, email) VALUES ($1, $2)", [name, email]);
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
    getUsersService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.default.query("SELECT * FROM users  ORDER BY id ASC");
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
    getUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = userInput;
            try {
                const response = yield database_1.default.query("SELECT * FROM users WHERE id = $1", [id]);
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = userInput;
            try {
                const response = yield database_1.default.query("DELETE FROM users WHERE id = $1", [id]);
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
    updateUserService(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email } = userInput;
            console.log(id);
            try {
                const response = yield database_1.default.query("UPDATE users SET name = $1 , email = $2 WHERE id = $3", [name, email, id]);
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
}
module.exports = UserService;
