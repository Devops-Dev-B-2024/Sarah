const { DataTypes } = require("sequelize")

module.exports = (instance) => {
  return instance.define(
    "criticsEditors",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      evaluation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      idEditor: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  )
}
