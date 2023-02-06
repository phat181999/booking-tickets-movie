import { Response, Request, NextFunction } from "express";
import { QueryResult } from "pg";
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const UserService = require("../services/user.service");
const Middlewares = require("../middlwares");
const services = new UserService();
const middlwares = new Middlewares();

export const getUers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const data = await services.getUsersService();
    return res.status(200).json({ message: "Success", data: data.rows });
  } catch (error) {
    console.log(error, "error");
    return res.status(401).json({ message: "Error Internal Server" });
  }
};

export const getUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { id } = req.params;
  try {
    const data = await services.getUserService({ id });
    return res.status(200).json({ message: "Success", data: data.rows });
  } catch (error) {
    console.log(error, "error");
    return res.status(401).json({ message: "Error Internal Server" });
  }
};

export const deteleUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const data: QueryResult = await services.deleteUserService({ id });
    return res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    console.log(error, "error");
    return res.status(401).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const data: QueryResult = await services.updateUserService({
      id,
      name,
      email,
    });
    console.log(data);
    return res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    console.log(error, "error");
    return res.status(401).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { name, email, password, role } = req.body;
  const checkEmail = await middlwares.checkEmailExist({ email });
  if (checkEmail) {
    return res.status(400).json({ message: "Email Exist" });
  }

  try {
    const data = await services.createUserService({
      name,
      email,
      password,
      role,
    });
    return res.json(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(401).json({ message: "Error Internal Server" });
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { email, password } = req.body;
  const checkEmail = await middlwares.checkEmailExist({ email });
  if (!checkEmail) {
    return res
      .status(400)
      .json({ message: "User is not registered, Sign Up first" });
  }
  try {
    const response = await services.loginService({
      email,
      password,
    });

    return res.json(response);
  } catch (error) {
    return res.status(401).json({ message: "Internal Server Error" });
  }
};
function next(error: unknown) {
  throw new Error("Function not implemented.");
}
