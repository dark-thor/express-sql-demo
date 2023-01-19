const axios = require('axios');
const {IP_LOCATION_URL, TOKEN} = require('../configs/serverConfigs');

async function getLocation(ipAddress) {
  try {
    const response = await axios({
      method: 'get',
      url: IP_LOCATION_URL + ipAddress,
      params: {
        token: TOKEN
      }
    });
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.statusText,
    }
  }
}

// getLocation('8.8.8.8').then(response => {
//   console.log(response);
// }).catch(err => console.log(err));

module.exports = {
  getLocation,
}
