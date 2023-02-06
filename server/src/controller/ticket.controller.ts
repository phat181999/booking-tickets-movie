import { Response, Request, NextFunction } from "express";
import { QueryResult } from "pg";
const TicketService = require("../services/ticket.service");
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const Middlewares = require("../middlwares");
const services = new TicketService();
const middlwares = new Middlewares();
export const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { userName, showTime, totalPrice, seat } = req.body;
  try {
    const data = await services.createTicketService({
      userName,
      showTime,
      totalPrice,
      seat,
    });

    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const getTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const data = await services.getTicketsService();
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const getTicketId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;

  try {
    const checkId = await middlwares.checkIdTicket({ id });

    if (!checkId) {
      return res.status(400).json({ message: "Ticket not found" });
    }
    const data = await services.getTicketIdService({ id });
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const deleteTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  try {
    const checkId = await middlwares.checkIdTicket({ id });

    if (!checkId) {
      return res.status(400).json({ message: "Ticket not found" });
    }
    const data = await services.deleteTicketUserService({ id });
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ message: "Error Internal Server" });
  }
};

export const updateTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  const { userName, showTime, totalPrice, seat } = req.body;
  try {
    const checkId = await middlwares.checkIdTicket({
      id,
    });

    if (!checkId) {
      return res.status(400).json({ message: "Ticket not found" });
    }
    const data = await services.updateTicketUserService({
      id,
      userName,
      showTime,
      totalPrice,
      seat,
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Error Internal Server" });
  }
};
