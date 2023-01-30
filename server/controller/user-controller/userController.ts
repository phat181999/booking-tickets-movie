import express, { Response, Request, NextFunction } from "express";

const userService = require("../../services/userService");

export interface UserInterface {
  username: any;
  email: any;
  password: any;
}
const services = new userService();

export const signIn = async (res: Response, req: UserInterface) => {
  try {
    const { username, email, password } = req;
    const data = await userService.createUserService({
      username,
      email,
      password,
    });
    // const httpResponse = http.get(data);
    // return res.json(httpResponse);
  } catch (error) {
    console.log(error);
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
    res.json({ message: "Internal Error" });
    return next();
  }
};

module.exports = {
  signIn,
  getAllUser,
};
