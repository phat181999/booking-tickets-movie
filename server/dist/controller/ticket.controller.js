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
exports.updateTicket = exports.deleteTicket = exports.getTicketId = exports.getTickets = exports.createTicket = void 0;
const TicketService = require("../services/ticket.service");
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Middlewares = require("../middlwares");
const services = new TicketService();
const middlwares = new Middlewares();
const createTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, showTime, totalPrice, seat } = req.body;
    try {
        const data = yield services.createTicketService({
            userName,
            showTime,
            totalPrice,
            seat,
        });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.createTicket = createTicket;
const getTickets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services.getTicketsService();
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.getTickets = getTickets;
const getTicketId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkId = yield middlwares.checkIdTicket({ id });
        if (!checkId) {
            return res.status(400).json({ message: "Ticket not found" });
        }
        const data = yield services.getTicketIdService({ id });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.getTicketId = getTicketId;
const deleteTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkId = yield middlwares.checkIdTicket({ id });
        if (!checkId) {
            return res.status(400).json({ message: "Ticket not found" });
        }
        const data = yield services.deleteTicketUserService({ id });
        return res.json(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.deleteTicket = deleteTicket;
const updateTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userName, showTime, totalPrice, seat } = req.body;
    try {
        const checkId = yield middlwares.checkIdTicket({
            id,
        });
        if (!checkId) {
            return res.status(400).json({ message: "Ticket not found" });
        }
        const data = yield services.updateTicketUserService({
            id,
            userName,
            showTime,
            totalPrice,
            seat,
        });
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ message: "Error Internal Server" });
    }
});
exports.updateTicket = updateTicket;
