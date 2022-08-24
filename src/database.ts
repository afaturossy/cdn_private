import { Sequelize, DataTypes, Model } from "sequelize";
import path from 'path'

const DB = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve("database/datafile.sqlite"),
  logging:false
});

class DATAFILE extends Model {
  declare url: string;
  declare path: string;
}

DATAFILE.init(
  {
    url: DataTypes.STRING,
    path: DataTypes.STRING,
  },
  { tableName: "datafile", sequelize: DB }
);


DB.sync();

export default DATAFILE;
