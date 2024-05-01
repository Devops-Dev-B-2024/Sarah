const { DataTypes } = require("sequelize")

module.exports = (instance) => {
  return instance.define(
    "criticsUsers",
    {
      idReview: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      comment: {
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
    },
    {
      timestamps: false,
    }
  )
}
