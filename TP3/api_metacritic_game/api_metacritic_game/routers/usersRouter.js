const express = require('express'),
    router = express.Router(),
    usersController = require('../controllers/usersController'),
    authMiddleware = require('../middlewares/authMiddleware')


router.get('/', authMiddleware("admin"), usersController.getUsers) // seul les administrateurs peuvent visualiser tous les utilisateurs
router.post('/', authMiddleware("admin"), usersController.addUser) // seul les administrateurs peuvent ajouter directement des utilisateurs en passant par la route
router.put('/', authMiddleware("gamer"), usersController.putUser) // tout utilisateur ayant pour rôle "gamer" peut modifier son compte
router.put('/role/:id', authMiddleware("admin"), usersController.updateRoleByUserId) // seul les administrateurs peuvents modifier les rôles des utilisateurs
router.get('/:id', authMiddleware("gamer"), usersController.getUserById) // tout utilisateur ayant pour rôle "gamer" peut accéder aux informations de son compte
router.delete('/', authMiddleware("gamer"), usersController.deleteUserById) // tout utilisateur ayant pour rôle "gamer" peut supprimer son compte


module.exports = router
