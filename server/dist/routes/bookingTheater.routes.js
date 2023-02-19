"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const BookingTheaterRouter = express.Router();
const bookingTheater_controller_1 = require("../controller/bookingTheater.controller");
BookingTheaterRouter.post("/booking-theater", bookingTheater_controller_1.bookingTheater);
BookingTheaterRouter.get("/get-booking-theater/:id", bookingTheater_controller_1.getBookingTheater);
BookingTheaterRouter.put("/update-booking-theater/:id", bookingTheater_controller_1.updateBookingTheater);
BookingTheaterRouter.delete("/delete-booking-theater/:id", bookingTheater_controller_1.deleteBookingTheater);
module.exports = {
    BookingTheaterRouter,
};
