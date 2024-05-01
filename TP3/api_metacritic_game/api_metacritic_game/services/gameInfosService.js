const configApiExterne = require('./../config.api.externe.js')
const NodeCache = require('node-cache')
const cache = new NodeCache()

exports.getAllGameName = async () => {
  await configApiExterne.getAuthorization()

  const isCache = cache.get('games')

  if ( isCache ) {
    return isCache
  }

  const data = fetch (
    "https://api.igdb.com/v4/games/",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': configApiExterne.client_id,
        'Authorization': `Bearer ${configApiExterne.access_token}`
      },
      body: "fields name,first_release_date,summary; limit 500; sort name asc;" 
    }
  ) .then(response => {
    return response.json()
  }) .catch(err => {
    console.error(err);
  })
  
  cache.set('games', data, 60)
  return data
}

exports.getGameInfosByName = async (nameT) => {
  await configApiExterne.getAuthorization()

  const isCacheID = cache.get('gamesID')

  if ( isCacheID ) {
    return isCacheID
  }

  const requestBody = `fields name,first_release_date,summary; where name = "${nameT}";`
  
  const data = fetch(
    "https://api.igdb.com/v4/games/",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': configApiExterne.client_id,
        'Authorization': `Bearer ${configApiExterne.access_token}`
      },
      body: requestBody
    }
  ) .then(response => {
    return response.json()
  }) .catch(err => {
    console.error(err);
  })

  cache.set('gamesID', data, 60)
  return data
}
