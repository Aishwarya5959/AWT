const axios = require('axios');

const apiKey = 'd4d54ca9df3073e166fae11dd37e44be';
const city = 'New York';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(url)
  .then(response => {
    console.log('Weather data:', response.data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
