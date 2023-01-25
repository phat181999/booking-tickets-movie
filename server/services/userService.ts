import { Sequelize } from "sequelize-typescript";

const { User } = require("../models");
const { STATUSCODES, APIError: error } = require("../utils/app-errors");
const {
  checkValidateEmail: checkEmail,
  checkPassword: checkPassword,
} = require("../utils/validate-error");

class UserService {
  async createuser(queryUser: any) {
    const { username, email, password } = queryUser;
    if (!username || !email || !password) {
      return new error("Require more information", STATUSCODES.BAD_REQUEST);
    }
    if (checkEmail(email)) {
      return new error("Require exactly email", STATUSCODES.BAD_REQUEST);
    }
    if (checkPassword(password)) {
      return new error(
        "The password must contain at least 8  characters including at least 1 uppercase, 1 lowercase, one digit.",
        STATUSCODES.BAD_REQUEST
      );
    }

    try {
      const query = await User.sequelize.query(
        "INSERT INTO User (username, email, password) VALUES ($1, $2, $3) RETURNING",
        [username, email, password]
      );
      return query;
    } catch (error) {
      return error;
    }
  }
}
