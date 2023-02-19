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
const multer = require("multer");

const storage = multer.diskStorage({});

const fileFilter = (
  req: any,
  file: { mimetype: string },
  cb: (arg0: string | null, arg1: boolean) => void
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};

const upload = multer({ storage, fileFilter });

UserRouter.get("/get-all-users", getUers);
UserRouter.post("/create-user", upload.single("users"), createUser);
UserRouter.get("/get-user/:id", getUserId);
UserRouter.delete("/delete-user/:id", deteleUser);
UserRouter.put("/update-user/:id", updateUser);
UserRouter.post("/login", logIn);

module.exports = {
  UserRouter,
};
