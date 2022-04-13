import Sequelize from "sequelize";
import config from "../../config/config";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect : "postgres",
    pool : {
      max : 5,
      min : 0,
      acquire : 30000,
      idle : 10000
    }
  }
)

const DataTypes = require("sequelize").DataTypes;
const _positions = require("./positions");
const _users = require("./users");


function initModels(sequelize) {
  const positions = _positions(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);


  return {
    positions,
    users,
  };
}

const models = initModels(sequelize);

export default models
export {sequelize}
// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
