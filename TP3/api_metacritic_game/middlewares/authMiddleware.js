const jwt = require('jsonwebtoken')
const { getUserById } = require('../services/usersService')
const { getIdRolesByNom } = require('../services/rolesService')

function auth(role) {
    return async function(req, res, next) {
        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).json({
                success: false,
                error: 'Unauthorized, must be connected'
            })
        } else {
            const token = authHeader.split(' ')[1]
            try{
                const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET)
                if(decodedToken) {
                    const getUser = await getUserById(decodedToken.userId)
                    const getRole = await getIdRolesByNom(role)
                    if(getUser.roles == getRole.id){
                        next()
                    } else {
                        res.status(403).json({
                            success: false,
                            error: 'Permission is denied'
                        })
                    }
                } else {
                    res.status(401).json({
                        success: false,
                        error: 'Authentication is no more valid'
                    })
                }
            } catch(e) {
                next(e)
            }
        }
    }
}

module.exports = auth