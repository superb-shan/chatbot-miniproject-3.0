const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://quizapi2.p.rapidapi.com/questions',
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': '6f6273b264msh23b3a3debb89dc3p1c40cajsn95a09b14be97',
    'X-RapidAPI-Host': 'quizapi2.p.rapidapi.com'
  }
};

try {
	axios.request(options)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

} catch (error) {
	console.error(error);
}