"use strict";
import { Model, UUIDV4 } from "sequelize";

interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    firstName!: string;
    lastName!: string;
    email!: string;
    static associate(models: any) {
      // define association here
      // User.hasOne(models.Ticket, {
      //   through: "UserTicket",
      // });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  return User;
};
