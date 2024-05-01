const db = require("../models/indexModel")


exports.getCriticsEditors = async () => {
  return await db.criticsEditors.findAll()
}

exports.addCriticsEditor = (evaluation, note, date, idEditor) => {
  return db.criticsEditors.create({ evaluation, note, date, idEditor })
}

exports.getCriticsEditorById = async (id) => {
  return await db.criticsEditors.findOne({
    where: {
      id,
    },
  })
}

exports.putCriticsEditor = async (id, evaluation, note, date, idEditor) => {
  return await db.criticsEditors.update(
    { evaluation: evaluation, note: note, date: date, idEditor: idEditor },
    {
      where: {
        id,
      },
    }
  )
}

exports.deleteCriticsEditorById = async (id) => {
  return await db.criticsEditors.destroy({
    where: {
      id,
    },
  })
}
