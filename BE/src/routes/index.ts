import { Router } from "express";
const router = Router();
const { UserRouter } = require("./user.routes");
const { TicketRouter } = require("./tickets.routes");

router.use("/user", UserRouter);
router.use("/ticket", TicketRouter);
export default router;
