const db = require('../models/indexModel')

exports.getIdRolesByNom = async (nom) => {
    return await db.roles.findOne({
        where: {
            nom,
        },
        attributes: ['id'],
    })
}
