const express = require('express'),
    router = express.Router(),
    reviewsController = require('../controllers/reviewsController'),
    authMiddleware = require('../middlewares/authMiddleware')

router.get('/', reviewsController.getReviews) // tout le monde peut accéder à l'ensemble des review
router.post('/', authMiddleware("editor"), reviewsController.addReview) // seul les utilisateurs avec le rôle "editor" peuvent ajouter une nouvelle review
router.put('/', authMiddleware("editor"), reviewsController.putReview) // seul les utilisateurs avec le rôle "editor" peuvent modifier les reviews
router.get('/:id', reviewsController.getReviewById) // tout le monde peut accéder à une review particulière
router.delete('/:id', authMiddleware("editor"), reviewsController.deleteReviewById) // seul les utilisateurs avec le rôle "editor" peuvent supprimer les reviews


module.exports = router
