import { Response, Request, NextFunction } from "express";
import { QueryResult } from "pg";
import client from "../database";
const BookingService = require("../services/bookingTheater.service");
import { BookingTheater } from "../entity/bookingTheater.enity";
const services = new BookingService();

export const bookingTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { movie_id, theater_id, createAt, deleteAt, status } = req.body;
  if (!movie_id || !theater_id || createAt || deleteAt || status) {
    res.status(400).json({ message: "Not empty records" });
  }
  const timetampCreate = new Date();
  const statusSuccess: string = "BOOKING THEATER SUCCESS";
  try {
    const checkTheater: QueryResult = await client.query(
      "SELECT * FROM bookingtheater WHERE theater_id = $1",
      [theater_id]
    );
    if (checkTheater.rowCount > 0) {
      for (let items of checkTheater.rows) {
        if (items.createat - items.deleteat > 0) {
          return res.status(500).json({ message: "Theater has beend booking" });
        } else if (items.createat - items.deleteat <= 0) {
          const data = await services.bookingTheaterService({
            movie_id,
            theater_id,
            createAt: timetampCreate,
            deleteAt,
            status: statusSuccess,
          });
          return res.json(data);
        }
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const getBookingTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  try {
    const checkId: QueryResult = await client.query(
      "SELECT * FROM bookingtheater WHERE bookingtheater_id = $1",
      [id]
    );

    if (checkId.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.getBookingTheaterService({ id });
    return res.json(data);
  } catch (error) {
    next(error);
    console.log(error);
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const deleteBookingTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  try {
    const checkId: QueryResult = await client.query(
      "SELECT * FROM bookingtheater WHERE bookingtheater_id = $1",
      [id]
    );

    if (checkId.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.deleteBookingTheaterService({ id });
    return res.json(data);
  } catch (error) {
    next(error);
    console.log(error);
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const updateBookingTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { movie_id, theater_id, createAt, deleteAt, status } = req.body;
  const { bookingtheater_id } = req.params;
  try {
    const checkId: QueryResult = await client.query(
      "SELECT * FROM bookingtheater WHERE bookingtheater_id = $1",
      [bookingtheater_id]
    );

    if (checkId.rowCount <= 0) {
      return res.status(400).json({ message: "Records not found" });
    }
    const data = await services.updateMovieUserService({
      movie_id,
      theater_id,
      createAt,
      deleteAt,
      status,
      bookingtheater_id,
    });
    return res.json(data);
  } catch (error) {
    next(error);
    console.log(error);
    return res.status(500).json({ message: "Error Internal Server" });
  }
};
