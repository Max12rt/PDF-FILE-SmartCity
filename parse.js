const axios = require('axios');

axios.get('https://gbfs.urbansharing.com/rowermevo.pl/station_information.json')
  .then(response => {
    // Handle the response data
    console.log(response.data);
  })
  .catch(error => {
    // Handle errors
    console.error('There was a problem with the request:', error);
  });