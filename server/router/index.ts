const express = require("express");

const {
  signIn,
  getAllUser,
} = require("../controller/user-controller/userController");
const rootRouter = express.Router();

rootRouter.use("/users", signIn);
rootRouter.get("/get-users", getAllUser);
module.exports = {
  rootRouter,
  getAllUser,
};
