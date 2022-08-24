import { Sequelize, DataTypes } from "sequelize/types";

const DB = new Sequelize({
  dialect: "sqlite",
  storage: "/database/datafile.sqlite",
});

const DATAFILE = DB.define("datafile", {
  url: DataTypes.STRING,
  path: DataTypes.STRING,
});

DB.sync();
