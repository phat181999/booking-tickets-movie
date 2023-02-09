const express = require("express");
const ShowTimesRouter = express.Router();
import {
  createShowTime,
  getShowtime,
} from "../controller//showtime.controller";
ShowTimesRouter.post("/create-show-time", createShowTime);
ShowTimesRouter.get("/get-showtime", getShowtime);
// ShowTimesRouter.get("/get-seat/:id", getSeatId);
// ShowTimesRouter.delete("/delete-seat/:id", deleteSeat);
// ShowTimesRouter.put("/update-seat/:id", updateSeat);
module.exports = {
  ShowTimesRouter,
};
