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
exports.updateTheater = exports.deleteTheater = exports.getTheaterId = exports.getTheaters = exports.createTheater = void 0;
const database_1 = __importDefault(require("../database"));
const ReviewService = require("../services/review.service");
const services = new ReviewService();
const createTheater = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameTheater, seat } = req.body;
    if (!nameTheater || !seat) {
        return res.status(400).json({ message: "Not Empty Record!" });
    }
    try {
        const data = yield services.createTheaterService({
            nameTheater,
            seat,
        });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.createTheater = createTheater;
const getTheaters = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services.getTheaterUsersService();
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.getTheaters = getTheaters;
const getTheaterId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkExists = yield database_1.default.query(`SELECT * FROM  theaters WHERE id = $1`, [id]);
        if (checkExists.rowCount <= 0) {
            return res.status(400).json({ message: "Records not found" });
        }
        const data = yield services.getTheaterUserService({ id });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.getTheaterId = getTheaterId;
const deleteTheater = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkExists = yield database_1.default.query(`SELECT * FROM  theaters WHERE id = $1`, [id]);
        if (checkExists.rowCount <= 0) {
            return res.status(400).json({ message: "Records not found" });
        }
        const data = yield services.deleteTheaterUserService({ id });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.deleteTheater = deleteTheater;
const updateTheater = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nameTheater, seat } = req.body;
    if (!nameTheater || !seat) {
        return res.status(400).json({ message: "Records not empty" });
    }
    try {
        const checkExists = yield database_1.default.query(`SELECT * FROM theaters WHERE id = $1`, [id]);
        if (checkExists.rowCount <= 0) {
            return res.status(400).json({ message: "Records not found" });
        }
        const data = yield services.updateTheaterUserService({
            id,
            nameTheater,
            seat,
        });
        return res.json(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.updateTheater = updateTheater;
