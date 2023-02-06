import { Response, Request, NextFunction } from "express";
import { QueryResult } from "pg";
import client from "../database";
const ReviewService = require("../services/review.service");
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Validations = require("../middlwares/validation");
const services = new ReviewService();
const validations = new Validations();

export const createShowTime = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { description, rating } = req.body;
  if (!description || !rating) {
    return res.status(400).json({ message: "Not Empty Record!" });
  }
  try {
    const data = await services.createReviewService({
      description,
      rating,
    });

    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const getReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const data = await services.getReviewsService();
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const getReviewId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  try {
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM  reviews WHERE id = $1`,
      [id]
    );
    if (checkExists.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.getReviewIdService({ id });
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  try {
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM  reviews WHERE id = $1`,
      [id]
    );
    if (checkExists.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.deleteReviewUserService({ id });
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  const { description, rating } = req.body;
  if (!description || !rating) {
    return res.status(400).json({ message: "Records not empty" });
  }
  try {
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM reviews WHERE id = $1`,
      [id]
    );
    if (checkExists.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.updateReviewUserService({
      id,
      description,
      rating,
    });
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Internal Server" });
  }
};
