const { DataTypes } = require("sequelize")

module.exports = (instance) => {
  return instance.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      roles: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false,
    }
  )
}
