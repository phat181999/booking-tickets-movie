const express = require("express");
const TheatersRouter = express.Router();
import {
  createTheater,
  getTheaters,
  getTheaterId,
  deleteTheater,
  updateTheater,
} from "../controller/theater.controller";
TheatersRouter.post("/create-theater", createTheater);
TheatersRouter.get("/get-theaters", getTheaters);
TheatersRouter.get("/get-theater/:id", getTheaterId);
TheatersRouter.delete("/delete-theater/:id", deleteTheater);
TheatersRouter.put("/update-theater/:id", updateTheater);
module.exports = {
  TheatersRouter,
};
