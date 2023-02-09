import { Response, Request, NextFunction } from "express";
import { QueryResult } from "pg";
import client from "../database";
const MovieService = require("../services/movie.service");
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Validations = require("../middlwares/validation");
const services = new MovieService();
const validations = new Validations();

export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { title, director, description, type, trailer, avatar, timeCount } =
    req.body;
  if (
    !title ||
    !director ||
    !description ||
    !type ||
    !trailer ||
    !avatar ||
    !timeCount
  ) {
    return res.status(400).json({ message: "Not Empty Record!" });
  }
  try {
    const checkMovieExitst = await validations.checkMovieExists({ title });
    if (checkMovieExitst) {
      return res.status(400).json({ message: "Movie Exists!" });
    }
    const data = await services.createTicketService({
      title,
      director,
      description,
      type,
      trailer,
      avatar,
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
