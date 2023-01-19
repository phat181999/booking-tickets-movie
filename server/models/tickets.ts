"use strict";
import { Model, UUIDV4 } from "sequelize";

interface TicketsAttributes {
  id: string;
  type: string;
  theater: number;
  movieName: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Ticket extends Model<TicketsAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    username!: string;
    email!: string;
    password!: string;
    static associate(models: any) {
      // define association here
      // Ticket.belongsTo(models.User, {
      //   through: "UserTicket",
      // });
    }
  }
  Ticket.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      theater: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      movieName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tickets",
    }
  );
  return Ticket;
};
