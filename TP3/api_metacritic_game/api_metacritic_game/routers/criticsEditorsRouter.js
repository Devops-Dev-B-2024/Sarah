const express = require('express'),
    router = express.Router(),
    criticsEditorsController = require('../controllers/criticsEditorsController'),
    authMiddleware = require('../middlewares/authMiddleware')


router.get('/', criticsEditorsController.getCriticsEditors) // tous le monde peut accéder aux critiques des "editor" sur les reviews
router.post('/', authMiddleware("editor"), criticsEditorsController.addCriticsEditor) // seul les "editor" peuvent poster des critiques editeur sur les reviews
router.put('/', authMiddleware("editor"), criticsEditorsController.putCriticsEditor) // seul les "editor" peuvent modifier leur critique
router.get('/:id', criticsEditorsController.getCriticsEditorById) // tous le monde peut accéder à une critique d'"editor" en particulier
router.delete('/:id', authMiddleware("editor"), criticsEditorsController.deleteCriticsEditorById) // seul les utilisateurs ayant pour rôle "editor" peuvent supprimer leurs critiques


module.exports = router
