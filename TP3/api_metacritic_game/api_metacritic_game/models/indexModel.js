const { Sequelize } = require("sequelize")
const dbConfig = require("../db.config")

const instance = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.hostname,
    port: dbConfig.port,
    dialect: "mysql",
  }
)

module.exports = {
  instance,
  users: require('./usersModel')(instance),
  reviews: require('./reviewsModel')(instance),
  criticsEditors: require('./criticsEditorsModel')(instance),
  criticsUsers: require('./criticsUsersModel')(instance),
  roles: require('./rolesModel')(instance),
}

instance.models.criticsUsers.belongsTo(instance.models.users, { foreignKey: "idUser" })
instance.models.criticsUsers.belongsTo(instance.models.reviews, { foreignKey: "idReview" })
instance.models.reviews.belongsTo(instance.models.criticsEditors, { foreignKey: "idCriticEditor" })
instance.models.criticsEditors.belongsTo(instance.models.users, { foreignKey: "idEditor" })
instance.models.users.belongsTo(instance.models.roles, { foreignKey: "roles" })
