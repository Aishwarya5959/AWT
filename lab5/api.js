 

  const apiKey = 'd4d54ca9df3073e166fae11dd37e44be';
const city = 'New York'; 
const url = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`; 
fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log('Weather data:', data);
 
  })
  .catch(error => {
    console.error('There was a problem:', error);
  });
