"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const TheatersRouter = express.Router();
const theater_controller_1 = require("../controller/theater.controller");
TheatersRouter.post("/create-theater", theater_controller_1.createTheater);
TheatersRouter.get("/get-theaters", theater_controller_1.getTheaters);
TheatersRouter.get("/get-theater/:id", theater_controller_1.getTheaterId);
TheatersRouter.delete("/delete-theater/:id", theater_controller_1.deleteTheater);
TheatersRouter.put("/update-theater/:id", theater_controller_1.updateTheater);
module.exports = {
    TheatersRouter,
};
