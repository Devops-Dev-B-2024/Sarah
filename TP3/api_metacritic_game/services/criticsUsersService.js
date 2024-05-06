const db = require('../models/indexModel')


exports.getCriticsUsers = async () => {
  return await db.criticsUsers.findAll()
}

exports.addCriticsUser = (idReview, idUser, comment, note) => {
    return db.criticsUsers.create({idReview, idUser, comment, note});
}

exports.getCriticsUserById = async (idReview,idUser) => {
    return await db.criticsUsers.findOne({
        where: {
            idReview,
            idUser
        }
    })
}

exports.putCriticsUser = async (idReview, idUser, comment, note) => {
    return await db.criticsUsers.update({ comment: comment, note: note},{
        where: {
            idReview,
            idUser
        }
    })
}

exports.deleteCriticsUserById = async (idReview, idUser) => {
    try {
      return await db.criticsUsers.destroy({
        where: {
          idReview,
          idUser,
        },
      })
    } catch (error) {
      throw new Error(
        `Une erreur s'est produite lors de la suppression de l'utilisateur de critiques : ${error}`
      )
    }
  }
