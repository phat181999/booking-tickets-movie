"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const MovieRouter = express.Router();
const movie_controller_1 = require("../controller/movie.controller");
MovieRouter.post("/create-movie", movie_controller_1.createMovie);
MovieRouter.get("/get-movies", movie_controller_1.getMovies);
MovieRouter.get("/get-movie/:id", movie_controller_1.getMovieId);
MovieRouter.delete("/delete-movie/:id", movie_controller_1.deleteMovie);
MovieRouter.put("/update-movie/:id", movie_controller_1.updateMovie);
module.exports = {
    MovieRouter,
};
