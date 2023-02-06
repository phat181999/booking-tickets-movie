"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ShowTimesRouter = express.Router();
const seat_controller_1 = require("../controller/seat.controller");
ShowTimesRouter.post("/create-seat", seat_controller_1.createSeat);
ShowTimesRouter.get("/get-seats", seat_controller_1.getSeats);
ShowTimesRouter.get("/get-seat/:id", seat_controller_1.getSeatId);
ShowTimesRouter.delete("/delete-seat/:id", seat_controller_1.deleteSeat);
ShowTimesRouter.put("/update-seat/:id", seat_controller_1.updateSeat);
module.exports = {
    ShowTimesRouter,
};
