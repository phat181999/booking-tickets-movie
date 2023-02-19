"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ShowTimesRouter = express.Router();
const showtime_controller_1 = require("../controller//showtime.controller");
ShowTimesRouter.post("/create-show-time", showtime_controller_1.createShowTime);
ShowTimesRouter.get("/get-showtime", showtime_controller_1.getShowtime);
// ShowTimesRouter.get("/get-seat/:id", getSeatId);
// ShowTimesRouter.delete("/delete-seat/:id", deleteSeat);
// ShowTimesRouter.put("/update-seat/:id", updateSeat);
module.exports = {
    ShowTimesRouter,
};
