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
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const jwt = require("jsonwebtoken");
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
class Middlewares {
    hashPassword(hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = hashPassword;
            const salt = bcrypt_1.default.genSaltSync(10);
            try {
                const hashPassword = bcrypt_1.default.hashSync(password, salt);
                return hashPassword;
            }
            catch (err) {
                return err;
            }
        });
    }
    checkEmailExist(emailInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = emailInput;
            try {
                const checkEmail = yield database_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
                if (checkEmail.rows.length != 0) {
                    return true;
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    createToken(emailInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = emailInput;
            const token = jwt.sign({ user_id }, process.env.SECRET_KEY);
            return token;
        });
    }
    checkPassword(passwordInput, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = passwordInput;
            const { passwordDB } = passwordHash;
            const checkPassword = bcrypt_1.default.compareSync(password, passwordDB);
            if (checkPassword) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    checkIdTicket(IdInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = IdInput;
            const checkId = yield database_1.default.query("SELECT * FROM tickets WHERE id = $1", [id]);
            if (checkId.rowCount != 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
module.exports = Middlewares;
