const db = require("../models/indexModel")
const { getIdRolesByNom } = require("./rolesService")

exports.getUsers = async () => {
  return await db.users.findAll({
    attributes: { exclude: ["hashedPassword"] },
  })
}

exports.addUser = async (pseudo, password, email, role) => {
  const roleId = await db.roles.findOne({
    where: {
        nom: role,
    },
    attributes: ['id'],
  })
  return db.users.create({pseudo: pseudo, hashedPassword: password, email: email, roles: roleId.id})
}

exports.getUserById = async (id) => {
  return await db.users.findOne({
    where: {
      id,
    },
    attributes: { exclude: ["hashedPassword"] },
  })
}

exports.putUser = async (id, pseudo, password, email) => {
  return await db.users.update(
    { pseudo: pseudo, hashedPassword: password, email: email },
    {
      where: {
        id,
      },
    }
  )
}

exports.updateRoleByUserId = async (id, role) => {
  const roleId = await getIdRolesByNom(role)
  return await db.users.update({
    roles: roleId.id
  },
  {
    where: {
      id,
    },
  })
}

exports.deleteUserById = async (id) => {
  const criticUser = await db.criticsUsers.findAll({
    where: {
      idUser: id
    }
  })
  if(criticUser){
    await db.criticsUsers.destroy({
      where: {
        idUser: id
      }
    })
  }
  return await db.users.destroy({
    where: {
      id,
    },
  })
}
