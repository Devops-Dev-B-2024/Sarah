const db = require("../models/indexModel")
const igdbService = require('./gameInfosService')


exports.getReviews = async () => {
  return await db.reviews.findAll()
}

exports.addReview = async (avg, title, idCriticEditor) => {
  try {
    const gameInfo = await igdbService.getGameInfosByName(title)

    if (gameInfo && gameInfo.length > 0) {
      const { first_release_date, summary, name } = gameInfo[0]
      const releaseDate = new Date(first_release_date * 1000)
      const year = releaseDate.getFullYear()
      const month = String(releaseDate.getMonth() + 1).padStart(2, '0')
      const day = String(releaseDate.getDate()).padStart(2, '0')
      const formattedDate = `${year}/${month}/${day}`

      const review = await db.reviews.create({
        avg,
        description: summary,
        title: name,
        release: formattedDate,
        idCriticEditor,
      })

      return review;
    } else {
      throw new Error('Game information not found.')
    }
  } catch (error) {
    throw new Error('Failed to add review')
  }
}

exports.getReviewById = async (id) => {
  return await db.reviews.findOne({
    where: {
      id,
    },
  })
}

exports.putReview = async (id, avg, description, title, release, idCriticEditor) => {
  return await db.reviews.update(
    { avg: avg, description: description, title: title, release: release, idCriticEditor: idCriticEditor},
    {
      where: {
        id,
      },
    }
  )
}

exports.deleteReviewById = async (id) => {
  try {
    const hasRelatedCriticsUsers = await db.criticsUsers.findOne({
      where: {
        idReview: id,
      },
    })
    if (hasRelatedCriticsUsers) {
      await db.criticsUsers.destroy({
        where: {
          idReview: id,
        },
      })
    }
    return await db.reviews.destroy({
      where: {
        id,
      },
    })
  } catch (error) {
    throw new Error(
      `Une erreur s'est produite lors de la suppression de l'avis : ${error}`
    )
  }
}
