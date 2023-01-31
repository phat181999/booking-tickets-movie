import { Response, Request, NextFunction } from "express";
import { QueryResult } from "pg";

const UserService = require("../services/user.service");
const services = new UserService();

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
  res: Response
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

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email } = req.body;
  try {
    const data: QueryResult = await services.createUserService({ name, email });
    return res.status(200).json({ message: "Success", body: data });
  } catch (error) {
    console.log(error, "error");
    return res.status(401).json({ message: "Internal Server Error" });
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
    console.log(name, email);
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
