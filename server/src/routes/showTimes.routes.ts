const express = require("express");
const ShowTimesRouter = express.Router();
import {
  createSeat,
  getSeats,
  getSeatId,
  deleteSeat,
  updateSeat,
} from "../controller/seat.controller";
ShowTimesRouter.post("/create-seat", createSeat);
ShowTimesRouter.get("/get-seats", getSeats);
ShowTimesRouter.get("/get-seat/:id", getSeatId);
ShowTimesRouter.delete("/delete-seat/:id", deleteSeat);
ShowTimesRouter.put("/update-seat/:id", updateSeat);
module.exports = {
  ShowTimesRouter,
};
