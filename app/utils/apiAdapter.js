const axios = require('axios');
var https = require('https')
var http = require('http')

module.exports = (url, httpsOn = true) => {
  return axios.create({ 
    baseURL: url,
    timeout: 60000,
    httpsAgent: httpsOn ? (new https.Agent({ keepAlive: true })) : null,
    httpAgent: httpsOn ? null : (new http.Agent({keepAlive: true}))
  });
}