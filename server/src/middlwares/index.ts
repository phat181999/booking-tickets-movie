import bcrypt from "bcrypt";
import client from "../database";
import { QueryResult } from "pg";
const jwt = require("jsonwebtoken");
const { STATUS_CODES, APIError, BadRequestError } = require("../Utils");
class Middlewares {
  async hashPassword(hashPassword: any) {
    const { password } = hashPassword;
    const salt = bcrypt.genSaltSync(10);
    try {
      const hashPassword = bcrypt.hashSync(password, salt);
      return hashPassword;
    } catch (err) {
      return err;
    }
  }

  async checkEmailExist(emailInput: any) {
    const { email } = emailInput;
    try {
      const checkEmail = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (checkEmail.rows.length != 0) {
        return true;
      }
    } catch (error) {
      return error;
    }
  }

  async createToken(emailInput: any) {
    const { user_id } = emailInput;
    const token = jwt.sign({ user_id }, process.env.SECRET_KEY);
    return token;
  }

  async checkPassword(passwordInput: any, passwordHash: any) {
    const { password } = passwordInput;
    const { passwordDB } = passwordHash;
    const checkPassword = bcrypt.compareSync(password, passwordDB);
    if (checkPassword) {
      return true;
    } else {
      return false;
    }
  }

  async checkIdTicket(IdInput: any) {
    const { id } = IdInput;
    const checkId: QueryResult = await client.query(
      "SELECT * FROM tickets WHERE id = $1",
      [id]
    );

    if (checkId.rowCount != 0) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = Middlewares;
