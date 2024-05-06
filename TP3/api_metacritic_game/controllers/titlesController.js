const titleServices = require('../services/titlesService')
const createError = require('http-errors')

exports.getAllTitles = async (req, res, next) => {
  try {
    const titles = await titleServices.getAllTitles()

    res.json(titles)
  } catch (error) {
    next(createError(400, "Failed to fetch game titles"))
  }
};

exports.getTitleByName = async (req, res, next) => {
  try {
    const nameT = req.params.nameT
    const titles = await titleServices.getTitleByName(nameT)

    res.json(titles)
  } catch (error) {
    next(createError(400, "Failed to fetch game titles by name"))
  }
};
