const express = require("express");
const UserRouter = express.Router();
import {
  getUers,
  createUser,
  getUserId,
  deteleUser,
  updateUser,
  logIn,
} from "../controller/user.controller";
UserRouter.get("/get-all-users", getUers);
UserRouter.post("/create-user", createUser);
UserRouter.get("/get-user/:id", getUserId);
UserRouter.delete("/delete-user/:id", deteleUser);
UserRouter.put("/update-user/:id", updateUser);
UserRouter.post("/login", logIn);

module.exports = {
  UserRouter,
};
