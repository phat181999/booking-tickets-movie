const express = require("express");
const TicketRouter = express.Router();
import {
  createTicket,
  getTickets,
  getTicketId,
  deleteTicket,
  updateTicket,
} from "../controller/ticket.controller";

TicketRouter.post("/create-ticket", createTicket);
TicketRouter.get("/get-tickets", getTickets);
TicketRouter.get("/get-ticket/:id", getTicketId);
TicketRouter.delete("/delete-ticket/:id", deleteTicket);
TicketRouter.put("/update-ticket/:id", updateTicket);
module.exports = { TicketRouter };
