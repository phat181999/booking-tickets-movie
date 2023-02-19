import { Response, Request, NextFunction } from "express";
import { QueryResult } from "pg";
import client from "../database";
const SeatService = require("../services/seat.service");
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Validations = require("../middlwares/validation");
const services = new SeatService();
const validations = new Validations();

export const createSeat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { row, seatNumber } = req.body;
  if (!row || !seatNumber) {
    return res.status(400).json({ message: "Not Empty Record!" });
  }
  try {
    const data = await services.createSeatService({
      row,
      seatNumber,
    });

    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const getSeats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const data = await services.getSeatsService();
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const getSeatId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  try {
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM  seats WHERE id = $1`,
      [id]
    );
    if (checkExists.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.getSeatIdService({ id });
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const deleteSeat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  try {
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM  seats WHERE id = $1`,
      [id]
    );
    if (checkExists.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.deleteSeatUserService({ id });
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const updateSeat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  const { row, seatNumber } = req.body;
  if (!row || !seatNumber) {
    return res.status(400).json({ message: "Records not empty" });
  }
  try {
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM seats WHERE id = $1`,
      [id]
    );
    if (checkExists.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.updateSeatUserService({
      id,
      row,
      seatNumber,
    });
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Internal Server" });
  }
};
