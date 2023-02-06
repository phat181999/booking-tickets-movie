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
exports.updateReview = exports.deleteReview = exports.getReviewId = exports.getReviews = exports.createShowTime = void 0;
const database_1 = __importDefault(require("../database"));
const ReviewService = require("../services/review.service");
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Validations = require("../middlwares/validation");
const services = new ReviewService();
const validations = new Validations();
const createShowTime = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, rating } = req.body;
    if (!description || !rating) {
        return res.status(400).json({ message: "Not Empty Record!" });
    }
    try {
        const data = yield services.createReviewService({
            description,
            rating,
        });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.createShowTime = createShowTime;
const getReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services.getReviewsService();
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.getReviews = getReviews;
const getReviewId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkExists = yield database_1.default.query(`SELECT * FROM  reviews WHERE id = $1`, [id]);
        if (checkExists.rowCount <= 0) {
            return res.status(400).json({ message: "Records not found" });
        }
        const data = yield services.getReviewIdService({ id });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.getReviewId = getReviewId;
const deleteReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkExists = yield database_1.default.query(`SELECT * FROM  reviews WHERE id = $1`, [id]);
        if (checkExists.rowCount <= 0) {
            return res.status(400).json({ message: "Records not found" });
        }
        const data = yield services.deleteReviewUserService({ id });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.deleteReview = deleteReview;
const updateReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { description, rating } = req.body;
    if (!description || !rating) {
        return res.status(400).json({ message: "Records not empty" });
    }
    try {
        const checkExists = yield database_1.default.query(`SELECT * FROM reviews WHERE id = $1`, [id]);
        if (checkExists.rowCount <= 0) {
            return res.status(400).json({ message: "Records not found" });
        }
        const data = yield services.updateReviewUserService({
            id,
            description,
            rating,
        });
        return res.json(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.updateReview = updateReview;
