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
exports.updateBookingTheater = exports.deleteBookingTheater = exports.getBookingTheater = exports.bookingTheater = void 0;
const database_1 = __importDefault(require("../database"));
const BookingService = require("../services/bookingTheater.service");
const services = new BookingService();
const bookingTheater = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { movie_id, theater_id, createAt, deleteAt, status } = req.body;
    if (!movie_id || !theater_id || createAt || deleteAt || status) {
        res.status(400).json({ message: "Not empty records" });
    }
    const timetampCreate = new Date();
    const statusSuccess = "BOOKING SUCCESS";
    try {
        const checkTheater = yield database_1.default.query("SELECT * FROM bookingtheater WHERE theater_id = $1", [theater_id]);
        if (checkTheater.rowCount > 0) {
            for (let items of checkTheater.rows) {
                if (items.createat - items.deleteat > 0) {
                    return res.status(500).json({ message: "Theater has beend booking" });
                }
                else if (items.createat - items.deleteat <= 0) {
                    const data = yield services.bookingTheaterService({
                        movie_id,
                        theater_id,
                        createAt: timetampCreate,
                        deleteAt,
                        status: statusSuccess,
                    });
                    return res.json(data);
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        next(error);
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.bookingTheater = bookingTheater;
const getBookingTheater = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkId = yield database_1.default.query("SELECT * FROM bookingtheater WHERE bookingtheater_id = $1", [id]);
        if (checkId.rowCount <= 0) {
            return res.status(400).json({ message: "Records not found" });
        }
        const data = yield services.getBookingTheaterService({ id });
        return res.json(data);
    }
    catch (error) {
        next(error);
        console.log(error);
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.getBookingTheater = getBookingTheater;
const deleteBookingTheater = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkId = yield database_1.default.query("SELECT * FROM bookingtheater WHERE bookingtheater_id = $1", [id]);
        if (checkId.rowCount <= 0) {
            return res.status(400).json({ message: "Records not found" });
        }
        const data = yield services.deleteBookingTheaterService({ id });
        return res.json(data);
    }
    catch (error) {
        next(error);
        console.log(error);
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.deleteBookingTheater = deleteBookingTheater;
const updateBookingTheater = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { movie_id, theater_id, createAt, deleteAt, status } = req.body;
    const { bookingtheater_id } = req.params;
    try {
        const checkId = yield database_1.default.query("SELECT * FROM bookingtheater WHERE bookingtheater_id = $1", [bookingtheater_id]);
        if (checkId.rowCount <= 0) {
            return res.status(400).json({ message: "Records not found" });
        }
        const data = yield services.updateMovieUserService({
            movie_id,
            theater_id,
            createAt,
            deleteAt,
            status,
            bookingtheater_id,
        });
        return res.json(data);
    }
    catch (error) {
        next(error);
        console.log(error);
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.updateBookingTheater = updateBookingTheater;
