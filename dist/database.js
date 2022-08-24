"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
const DB = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: path_1.default.resolve("database/datafile.sqlite"),
    logging: false
});
class DATAFILE extends sequelize_1.Model {
}
DATAFILE.init({
    url: sequelize_1.DataTypes.STRING,
    path: sequelize_1.DataTypes.STRING,
}, { tableName: "datafile", sequelize: DB });
DB.sync();
exports.default = DATAFILE;
