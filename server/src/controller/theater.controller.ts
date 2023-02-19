import e, { Response, Request, NextFunction } from "express";
import { QueryResult } from "pg";
import client from "../database";
const TheaterService = require("../services/theater.service");
const services = new TheaterService();

export const createTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { nameTheater, seat_id, showTimes_id } = req.body;
  if (!nameTheater || !seat_id || !showTimes_id) {
    return res.status(400).json({ message: "Not Empty Record!" });
  }
  console.log(seat_id);
  try {
    const checkSeat: QueryResult = await client.query(
      "SELECT * FROM seats WHERE seat_id = $1",
      [seat_id]
    );
    if (checkSeat.rowCount == 0) {
      return res.status(400).json({ message: "Records seats not found" });
    }

    const checkShowTime: QueryResult = await client.query(
      "SELECT * FROM showtimes WHERE showtime_id = $1",
      [showTimes_id]
    );
    if (checkShowTime.rowCount == 0) {
      return res.status(400).json({ message: "Records show time not found" });
    }
    const data = await services.createTheaterService({
      nameTheater,
      seat_id,
      showTimes_id,
    });

    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    next(error);
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const getTheaters = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const data = await services.getTheaterUsersService();
    return res.json(data.rows);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const getTheaterId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  try {
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM  theaters WHERE theater_id = $1`,
      [id]
    );
    if (checkExists.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.getTheatersService({ id });
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    next(error);
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const deleteTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  try {
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM  theaters WHERE id = $1`,
      [id]
    );
    if (checkExists.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.deleteTheaterUserService({ id });
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const updateTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  const { nameTheater, seat } = req.body;
  if (!nameTheater || !seat) {
    return res.status(400).json({ message: "Records not empty" });
  }
  try {
    const checkExists: QueryResult = await client.query(
      `SELECT * FROM theaters WHERE id = $1`,
      [id]
    );
    if (checkExists.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.updateTheaterUserService({
      id,
      nameTheater,
      seat,
    });
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Internal Server" });
  }
};
