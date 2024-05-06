const criticsUsersService = require('../services/criticsUsersService')
const reviewsService = require('../services/reviewsService')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')


exports.getCriticsUsers = async (req, res, next) => {
   const criticsUsers = await criticsUsersService.getCriticsUsers()
   if (criticsUsers) {
      res.json({ data: criticsUsers })
   } else {
      next(createError(404, "no criticsUser found"))
   }
}

exports.addCriticsUser = async (req, res, next) => {
   if(await criticsUsersService.getCriticsUserById(req.body.idReview, req.body.idUser)){
      res.status(400).json({
         success: false,
         message: "This user already have a critic for this review"
      }).send()
      return
   }
   const criticsUserCreated = criticsUsersService.addCriticsUser(req.body.idReview, req.body.idUser, req.body.comment, req.body.note)
   if (criticsUserCreated) {
      res.status(201).json({idReview: criticsUserCreated.idReview, idUser: criticsUserCreated.idUser})
   } else {
      next(createError(400, "Error when creating this criticsUser, verify your args"))
   }
}

exports.getCriticsUserById = async (req, res, next) => {
   const criticsUser = await criticsUsersService.getCriticsUserById(req.params.idReview, req.params.idUser)
   if (criticsUser) {
      res.json({ data: criticsUser })
   } else {
      next(createError(404, "no criticsUser found for this idReview and idUser"))
   }
}

exports.putCriticsUser = async (req, res, next) => {
   const userConnected = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SIGN_SECRET)

   if((!await criticsUsersService.getCriticsUserById(req.body.idReview, userConnected.userId))){
      res.status(400).json({
         success: false,
         message: "No critic found"
      }).send()
      return
   }
   const criticsUserUpdated = criticsUsersService.putCriticsUser(req.body.idReview, userConnected.userId, req.body.comment, req.body.note, req.body.date)
   if (criticsUserUpdated) {
      res.status(201).json({
         success: true,
         message: "Critic updated"
      })
   } else {
      next(createError(400, "Error when updating this criticsUser, verify your args"))
   }
}

exports.deleteCriticsUserById = (req, res, next) => {
   try {
      criticsUsersService.deleteCriticsUserById(req.params.idReview, req.params.idUser)
      res.status(204).send()
   } catch(e) {
      next(createError(404, `The criticsUser with idUser '${idUser}' and/or idReview '${idReview}'  doesn't exists, it cannot be deleted`))
   }
}
