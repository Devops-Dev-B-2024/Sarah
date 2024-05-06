const igdbService = require('./gameInfosService')


exports.getAllTitles = async () => {
  try {
    const titles = await igdbService.getAllGameName()

    return titles
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch game titles')
  }
}

exports.getTitleByName = async (nameT) => {
  try {
    const title = await igdbService.getGameInfosByName(nameT)

    return title
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch game titles by name')
  }
}
