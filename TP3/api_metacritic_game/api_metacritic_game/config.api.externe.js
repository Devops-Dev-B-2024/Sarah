module.exports = {
    client_id: "gudetfuzegat7v1bqozkvhr96i59dm",
    secret_id: "9z1ve4q1nbzsia86zjqpq04sn75abl",
    access_token: null,
  
    async getAuthorization() {
      let fetch
      try {
        const { default: fetchDefault } = await import('node-fetch');
        fetch = fetchDefault
      } catch (err) {
        fetch = require('node-fetch')
      }
  
      if (this.access_token !== null) {
        return this.access_token
      }
  
      const url = `https://id.twitch.tv/oauth2/token?client_id=${this.client_id}&client_secret=${this.secret_id}&grant_type=client_credentials`
  
      try {
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json()
        this.access_token = data.access_token
        return this.access_token
      } catch (error) {
        console.error(error)
        throw new Error('Failed to get authorization')
      }
    }
  }
  
