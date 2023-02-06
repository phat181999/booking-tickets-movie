const express = require("express");
const MovieRouter = express.Router();
import {
  createMovie,
  getMovies,
  getMovieId,
  deleteMovie,
  updateMovie,
} from "../controller/movie.controller";
MovieRouter.post("/create-movie", createMovie);
MovieRouter.get("/get-movies", getMovies);
MovieRouter.get("/get-movie/:id", getMovieId);
MovieRouter.delete("/delete-movie/:id", deleteMovie);
MovieRouter.put("/update-movie/:id", updateMovie);
module.exports = {
  MovieRouter,
};
