"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { UserRouter } = require("./user.route");
router.use("/user", UserRouter);
exports.default = router;
