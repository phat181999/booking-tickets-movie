import { Router } from "express";
const router = Router();
const { UserRouter } = require("./user.routes");
const { TicketRouter } = require("./tickets.routes");
const { MovieRouter } = require("./movies.routes");
const { ReviewsRouter } = require("./reviews.routes");
const { SeatsRouter } = require("./seats.routes");

router.use("/user", UserRouter);
router.use("/ticket", TicketRouter);
router.use("/movie", MovieRouter);
router.use("/review", ReviewsRouter);
router.use("/seats", SeatsRouter);

export default router;
