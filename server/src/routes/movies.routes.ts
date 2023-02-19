const express = require("express");
const MovieRouter = express.Router();
import {
  createMovie,
  getMovies,
  getMovieId,
  deleteMovie,
  updateMovie,
} from "../controller/movie.controller";

const multer = require("multer");

const storage = multer.diskStorage({});

const fileFilter = (
  req: any,
  file: { mimetype: string },
  cb: (arg0: string | null, arg1: boolean) => void
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};

const upload = multer({ storage, fileFilter });

MovieRouter.post("/create-movie", upload.array("movies", 12), createMovie);
MovieRouter.get("/get-movies", getMovies);
MovieRouter.get("/get-movie/:id", getMovieId);
MovieRouter.delete("/delete-movie/:id", deleteMovie);
MovieRouter.put("/update-movie/:id", updateMovie);
module.exports = {
  MovieRouter,
};
