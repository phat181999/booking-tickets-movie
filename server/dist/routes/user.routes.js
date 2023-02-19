"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const UserRouter = express.Router();
const user_controller_1 = require("../controller/user.controller");
const multer = require("multer");
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb("invalid image file!", false);
    }
};
const upload = multer({ storage, fileFilter });
UserRouter.get("/get-all-users", user_controller_1.getUers);
UserRouter.post("/create-user", upload.single("users"), user_controller_1.createUser);
UserRouter.get("/get-user/:id", user_controller_1.getUserId);
UserRouter.delete("/delete-user/:id", user_controller_1.deteleUser);
UserRouter.put("/update-user/:id", user_controller_1.updateUser);
UserRouter.post("/login", user_controller_1.logIn);
module.exports = {
    UserRouter,
};
