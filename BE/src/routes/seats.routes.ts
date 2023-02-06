const express = require("express");
const SeatsRouter = express.Router();
import {
  createSeat,
  getSeats,
  getSeatId,
  deleteSeat,
  updateSeat,
} from "../controller/seat.controller";
SeatsRouter.post("/create-seat", createSeat);
SeatsRouter.get("/get-seats", getSeats);
SeatsRouter.get("/get-seat/:id", getSeatId);
SeatsRouter.delete("/delete-seat/:id", deleteSeat);
SeatsRouter.put("/update-seat/:id", updateSeat);
module.exports = {
  SeatsRouter,
};
