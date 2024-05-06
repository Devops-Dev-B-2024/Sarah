const express = require('express'),
    router = express.Router(),
    gameInfos = require('../controllers/gameInfosController')

router.get('https://api.igdb.com/v4/games/', gameInfos.getAllGameName)
router.get('https://api.igdb.com/v4/games/', gameInfos.getGameInfosByName)

module.exports = router
