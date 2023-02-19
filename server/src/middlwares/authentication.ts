import { Response, Request, NextFunction } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const Authentication = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  try {
    if (token && token.split("")[1] != null) {
      jwt.verify(token, process.env.SECRET_KEY, (error: any, data: any) => {
        if (error) {
          return res
            .status(401)
            .json({ succeses: false, message: "Token Expired" });
        }
        req.data = data;
        next();
      });
    } else {
      res.status(403).json({ succeses: false, message: "UnAuthorized" });
    }
  } catch (err) {
    res.status(403).json({ success: false, message: "UnAuthorized" });
  }
};
