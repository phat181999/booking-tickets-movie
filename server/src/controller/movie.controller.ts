import { Response, Request, NextFunction } from "express";
import { QueryResult } from "pg";
import client from "../database";
const MovieService = require("../services/movie.service");
import { cloudinaryInstance } from "../services";
const Validations = require("../middlwares/validation");
const path = require("path");
const services = new MovieService();
const validations = new Validations();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
export const createMovie = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { title, director, description, type, trailer, avatar, timeCount } =
    req.body;

  cloudinary.config({
    cloud_name: "demo-project",
    api_key: "815568646484313",
    api_secret: "az33LMviYjQt8qUdxeoVseuPFK4",
  });

  try {
    const checkMovieExitst = await validations.checkMovieExists({ title });
    if (checkMovieExitst) {
      return res.status(400).json({ message: "Movie Exists!" });
    }
    var imageUrlList = [];
    for (var i = 0; i < req.files.length; i++) {
      const result = req.files[i].path;
      const upload = await cloudinary.uploader.upload(result, {
        public_id: "movies",
      });

      imageUrlList.push(upload.url);
    }
    const data = await services.createTicketService({
      title,
      director,
      description,
      type,
      trailer,
      avatar: imageUrlList,
      timeCount,
    });
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const data = await services.getMoviesService();
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const getMovieId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  try {
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM  movies WHERE id = $1`,
      [id]
    );
    if (checkExists.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.getMovieIdService({ id });
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const deleteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  try {
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM  movies WHERE id = $1`,
      [id]
    );
    if (checkExists.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.deleteMovieUserService({ id });
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  const { title, director, description, type, trailer, avatar } = req.body;
  try {
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM  movies WHERE id = $1`,
      [id]
    );
    if (checkExists.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.updateMovieUserService({
      id,
      title,
      director,
      description,
      type,
      trailer,
      avatar,
    });
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Internal Server" });
  }
};
