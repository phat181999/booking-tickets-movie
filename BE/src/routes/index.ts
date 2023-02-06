import { Router } from "express";
const router = Router();
const { UserRouter } = require("./user.route");

router.use("/user", UserRouter);

export default router;
