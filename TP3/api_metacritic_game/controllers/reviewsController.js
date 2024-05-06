const reviewsService = require('../services/reviewsService')
const createError = require('http-errors')


exports.getReviews = async (req, res, next) => {
   const reviews = await reviewsService.getReviews()
   if (reviews) {
      res.json({ data: reviews })
   } else {
      next(createError(404, "no review found"))
   }
}

exports.addReview = (req, res, next) => {
   const reviewCreated = reviewsService.addReview(req.body.avg, req.body.title, req.body.idCriticEditor)
   if (reviewCreated) {
      res.status(201).json({id: reviewCreated.id})
   } else {
      next(createError(400, "Error when creating this review, verify your args"))
   }
}

exports.getReviewById = async (req, res, next) => {
   const review = await reviewsService.getReviewById(req.params.id)
   if (review) {
      res.json({ data: review })
   } else {
      next(createError(404, "no review found for this id"))
   }
}

exports.putReview = (req, res, next) => {
   const reviewUpdated = reviewsService.putReview(req.body.id, req.body.avg, req.body.description, req.body.title, req.body.release, req.body.idCriticEditor)
   if (reviewUpdated) {
      res.status(201).json({id: reviewUpdated.id})
   } else {
      next(createError(400, "Error when updating this review, verify your args"))
   }
}

exports.deleteReviewById = (req, res, next) => {
   try {
      reviewsService.deleteReviewById(req.params.id)
      res.status(204).send()
   } catch(e) {
      next(createError(404, `The review with id '${id}' doesn't exists, it cannot be deleted`))
   }
}
