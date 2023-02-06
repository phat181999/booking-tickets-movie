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
exports.updateMovie = exports.deleteMovie = exports.getMovieId = exports.getMovies = exports.createMovie = void 0;
const database_1 = __importDefault(require("../database"));
const MovieService = require("../services/movie.service");
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Validations = require("../middlwares/validation");
const services = new MovieService();
const validations = new Validations();
const createMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, director, description, type, trailer, avatar } = req.body;
    if (!title || !director || !description || !type || !trailer || !avatar) {
        return res.status(400).json({ message: "Not Empty Record!" });
    }
    try {
        const checkMovieExitst = yield validations.checkMovieExists({ title });
        if (checkMovieExitst) {
            return res.status(400).json({ message: "Movie Exists!" });
        }
        const data = yield services.createTicketService({
            title,
            director,
            description,
            type,
            trailer,
            avatar,
        });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.createMovie = createMovie;
const getMovies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services.getMoviesService();
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.getMovies = getMovies;
const getMovieId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkExists = yield database_1.default.query(`SELECT * FROM  movies WHERE id = $1`, [id]);
        if (checkExists.rowCount <= 0) {
            return res.status(400).json({ message: "Records not found" });
        }
        const data = yield services.getMovieIdService({ id });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.getMovieId = getMovieId;
const deleteMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkExists = yield database_1.default.query(`SELECT * FROM  movies WHERE id = $1`, [id]);
        if (checkExists.rowCount <= 0) {
            return res.status(400).json({ message: "Records not found" });
        }
        const data = yield services.deleteMovieUserService({ id });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.deleteMovie = deleteMovie;
const updateMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, director, description, type, trailer, avatar } = req.body;
    try {
        const checkExists = yield database_1.default.query(`SELECT * FROM  movies WHERE id = $1`, [id]);
        if (checkExists.rowCount <= 0) {
            return res.status(400).json({ message: "Records not found" });
        }
        const data = yield services.updateMovieUserService({
            id,
            title,
            director,
            description,
            type,
            trailer,
            avatar,
        });
        return res.json(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.updateMovie = updateMovie;
