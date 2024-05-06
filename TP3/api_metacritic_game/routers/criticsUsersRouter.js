const express = require('express'),
    router = express.Router(),
    criticsUsersController = require('../controllers/criticsUsersController'),
    authMiddleware = require('../middlewares/authMiddleware')


router.get('/', criticsUsersController.getCriticsUsers) // tout le monde peut accéder aux critiques des utilisateurs sur les reviews
router.post('/', authMiddleware("gamer"), criticsUsersController.addCriticsUser) //seul les utilisateurs ayant pour rôle "gamer" peuvent ajouter une critiuqe sur une review
router.put('/', authMiddleware("gamer"), criticsUsersController.putCriticsUser) // seul les utilisateurs ayant pour rôle "gamer" peuvent modifier leur critique
router.get('/:idUser/:idReview', criticsUsersController.getCriticsUserById) // tout le monde peut accéder aux critiques des "gamer" sur les reviews
router.delete('/:idUser/:idReview', authMiddleware("gamer"), criticsUsersController.deleteCriticsUserById) // seul l'utilisateur ayant pour rôle "gamer" peut supprimer ses critiques


module.exports = router
