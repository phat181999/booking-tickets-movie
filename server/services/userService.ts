import db from "../models";
const { User } = require("../models");
const { STATUSCODES, APIError: error } = require("../utils/app-errors");
const {
  checkValidateEmail: checkEmail,
  checkPassword: checkPassword,
} = require("../utils/validate-error");

class UserService {
  async createUserService(userInputs: any) {
    const { firstName, lastName, email } = userInputs;
    // console.log(STATUSCODES.BAD_REQUEST, "log");
    // if (!username || !email || !password) {
    //   return new error("Require more information");
    // }
    // if (checkEmail(email)) {
    //   return new error("Require exactly email", STATUSCODES.BAD_REQUEST);
    // }
    // if (checkPassword(password)) {
    //   return new error(
    //     "The password must contain at least 8  characters including at least 1 uppercase, 1 lowercase, one digit.",
    //     STATUSCODES.BAD_REQUEST
    //   );
    // }
    try {
      // const [query] = await db.Users.sequelize.query(
      //   `INSERT INTO "Users" ("firstName", "lastName", "email") VALUES ('$1', '$2', '$3')`,
      //   [firstName, lastName, email]
      // );
      const query = await db.Users.create({
        firstName,
        lastName,
        email,
      });
      return query;
    } catch (error) {
      return error;
    }
  }

  async getUser() {
    try {
      const [query] = await db.Users.sequelize.query(
        `SELECT * FROM "Users" ORDER BY id ASC`
      );
      return query;
    } catch (error) {
      return error;
    }
  }

  async getUserId(userInput: any) {
    const { id } = userInput;
    try {
      const [query] = await db.Users.findOne({ where: { id } });
      return query;
    } catch (error) {
      return error;
    }
  }
}
module.exports = UserService;
