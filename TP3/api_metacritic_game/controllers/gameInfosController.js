const gameInfos = require('../services/gameInfosService')


exports.getAllGameName = (req, res) => {
    const game = gameInfos.getAllGameName()
    res.json({ data: game})
}

exports.getGameInfosByName = (req, res) => {
  const game = gameInfos.getGameInfosByName()
  res.json({ data: game})
}
       
