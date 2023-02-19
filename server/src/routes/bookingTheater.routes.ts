const express = require("express");
const BookingTheaterRouter = express.Router();
import {
  bookingTheater,
  getBookingTheater,
  updateBookingTheater,
  deleteBookingTheater,
} from "../controller/bookingTheater.controller";
BookingTheaterRouter.post("/booking-theater", bookingTheater);
BookingTheaterRouter.get("/get-booking-theater/:id", getBookingTheater);
BookingTheaterRouter.put("/update-booking-theater/:id", updateBookingTheater);
BookingTheaterRouter.delete(
  "/delete-booking-theater/:id",
  deleteBookingTheater
);
module.exports = {
  BookingTheaterRouter,
};
