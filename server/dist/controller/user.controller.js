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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.createUser = exports.updateUser = exports.deteleUser = exports.getUserId = exports.getUers = void 0;
const UserService = require("../services/user.service");
const Middlewares = require("../middlwares");
const services = new UserService();
const middlwares = new Middlewares();
const getUers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services.getUsersService();
        return res.json({ data });
    }
    catch (error) {
        console.log(error, "error");
        next(error);
        return res.status(401).json({ message: "Error Internal Server" });
    }
});
exports.getUers = getUers;
const getUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield services.getUserService({ id });
        return res.status(200).json({ message: "Success", data: data.rows });
    }
    catch (error) {
        console.log(error, "error");
        return res.status(401).json({ message: "Error Internal Server" });
    }
});
exports.getUserId = getUserId;
const deteleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const data = yield services.deleteUserService({ id });
        return res.status(200).json({ message: "Success", data: data });
    }
    catch (error) {
        console.log(error, "error");
        return res.status(401).json({ message: "Internal Server Error" });
    }
});
exports.deteleUser = deteleUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, email } = req.body;
        const data = yield services.updateUserService({
            id,
            name,
            email,
        });
        console.log(data);
        return res.status(200).json({ message: "Success", data: data });
    }
    catch (error) {
        console.log(error, "error");
        return res.status(401).json({ message: "Internal Server Error" });
    }
});
exports.updateUser = updateUser;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    const checkEmail = yield middlwares.checkEmailExist({ email });
    if (checkEmail) {
        return res.status(400).json({ message: "Email Exist" });
    }
    try {
        const data = yield services.createUserService({
            name,
            email,
            password,
            role,
        });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        next();
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.createUser = createUser;
const logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const checkEmail = yield middlwares.checkEmailExist({ email });
    if (!checkEmail) {
        return res
            .status(400)
            .json({ message: "User is not registered, Sign Up first" });
    }
    try {
        const response = yield services.loginService({
            email,
            password,
        });
        return res.json(response);
    }
    catch (error) {
        return res.status(401).json({ message: "Internal Server Error" });
    }
});
exports.logIn = logIn;
function next(error) {
    throw new Error("Function not implemented.");
}
