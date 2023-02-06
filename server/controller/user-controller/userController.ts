import express, { Response, Request, NextFunction } from "express";

const userService = require("../../services/userService");

export interface UserInterface {
  firstName: any;
  lastName: any;
  email: any;
}
const services = new userService();

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email } = req.body;
    const data = await services.createUserService({
      firstName,
      lastName,
      email,
    });
    console.log(data);
    return res.status(200).json({
      message: "Create Success",
      data: data,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(401).json({
      message: "Create fail",
    });
    return next();
  }
};

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await services.getUser();
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Internal Error" });
    return next();
  }
};

export const getUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params;
  console.log(id);
  try {
    const data = await services.getUserId(id);
    console.log(data);
    return res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Internal Error" });
    return next();
  }
};

module.exports = {
  signIn,
  getAllUser,
  getUserId,
};
