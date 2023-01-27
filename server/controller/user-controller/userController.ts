const express = require("express");
const http = require("http");
const userService = require("../../services/userService");

export interface UserInterface {
  username: any;
  email: any;
  password: any;
}

const signIn = async (res: Response, req: UserInterface) => {
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

const getAllUser = async (res: Response, req: UserInterface) => {
  try {
    const data = await userService.getUser();
    // const httpResponse = http.get(data);
    // return res.json(httpResponse);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signIn,
  getAllUser,
};
