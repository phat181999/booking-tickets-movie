"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const UserRouter = express.Router();
const user_controller_1 = require("../controller/user.controller");
UserRouter.get("/get-all-users", user_controller_1.getUers);
UserRouter.post("/create-user", user_controller_1.createUser);
UserRouter.get("/get-user/:id", user_controller_1.getUserId);
UserRouter.delete("/delete-user/:id", user_controller_1.deteleUser);
UserRouter.put("/update-user/:id", user_controller_1.updateUser);
UserRouter.post("/login", user_controller_1.logIn);
module.exports = {
    UserRouter,
};
