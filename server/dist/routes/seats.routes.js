"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const SeatsRouter = express.Router();
const seat_controller_1 = require("../controller/seat.controller");
SeatsRouter.post("/create-seat", seat_controller_1.createSeat);
SeatsRouter.get("/get-seats", seat_controller_1.getSeats);
SeatsRouter.get("/get-seat/:id", seat_controller_1.getSeatId);
SeatsRouter.delete("/delete-seat/:id", seat_controller_1.deleteSeat);
SeatsRouter.put("/update-seat/:id", seat_controller_1.updateSeat);
module.exports = {
    SeatsRouter,
};
