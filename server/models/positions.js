const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('positions', {
    pos_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pos_job: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pos_description: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    pos_location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pos_work: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    pos_salary: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'positions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pos_id_pk",
        unique: true,
        fields: [
          { name: "pos_id" },
        ]
      },
    ]
  });
};
