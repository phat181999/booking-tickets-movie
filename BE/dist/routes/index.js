"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { UserRouter } = require("./user.routes");
const { TicketRouter } = require("./tickets.routes");
router.use("/user", UserRouter);
router.use("/ticket", TicketRouter);
exports.default = router;
