"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("sequelize/types");
const DB = new types_1.Sequelize({
    dialect: "sqlite",
    storage: "/database/datafile.sqlite",
});
const DATAFILE = DB.define("datafile", {
    url: types_1.DataTypes.STRING,
    path: types_1.DataTypes.STRING,
});
DB.sync();
