import client from "../database";
import { QueryResult } from "pg";
import bcrypt from "bcrypt";
const Middlewares = require("../middlwares");
require("dotenv").config();
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
const middlwares = new Middlewares();
class UserService {
  async createUserService(userInput: any) {
    const { name, email, password, role, avatar } = userInput;

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);
      const response: QueryResult = await client.query(
        "INSERT INTO users (name, email, password, role, avatar) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, email, hashPassword, role, avatar]
      );

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Create successfully!`,
        data: response.rows,
      };
    } catch (error) {
      return {
        status: STATUS_CODES.BadRequestError,
        success: false,
        message: `Internal Server Error!`,
        error: error,
      };
    }
  }

  async getUsersService() {
    try {
      const response: QueryResult = await client.query("SELECT * FROM users");
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Create Reviews Successfully!`,
        data: response.rows,
      };
    } catch (error) {
      return error;
    }
  }

  async getUserService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteUserService(userInput: any) {
    const { id } = userInput;
    try {
      const response: QueryResult = await client.query(
        "DELETE FROM users WHERE id = $1",
        [id]
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateUserService(userInput: any) {
    const { id, name, email } = userInput;
    try {
      const response: QueryResult = await client.query(
        "UPDATE users SET name = $1 , email = $2 WHERE id = $3",
        [name, email, id]
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async loginService(userInput: any) {
    try {
      const { email, password } = userInput;

      const query: QueryResult = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      const user = query.rows[0].password;
      const checkPassword = bcrypt.compareSync(password, user);
      if (!checkPassword) {
        return new APIError("Password was wrong!", STATUS_CODES.BAD_REQUEST);
      }
      const queryUser: QueryResult = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      const user_id = queryUser.rows[0].user_id;
      const token = await middlwares.createToken({ user_id });
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Create successfully!`,
        data: query.rows,
        token: token,
      };
    } catch (error) {
      return error;
    }
  }
}
module.exports = UserService;
