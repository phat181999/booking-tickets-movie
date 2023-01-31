const express = require("express");

const {
  signIn,
  getAllUser,
  getUserId,
} = require("../controller/user-controller/userController");
const rootRouter = express.Router();

rootRouter.use("/users", signIn);
rootRouter.get("/get-users", getAllUser);
rootRouter.get("/get-user/:id", getUserId);
module.exports = {
  rootRouter,
  getAllUser,
};
