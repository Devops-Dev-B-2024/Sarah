const express = require('express'),
    router = express.Router(),
    titlesController = require('../controllers/titlesController'),
    authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware("editor"), titlesController.getAllTitles)
router.get('/:nameT', authMiddleware("editor"), titlesController.getTitleByName)

module.exports = router
