const request = require('postman-request');
require('dotenv').config();

const forecast = (address, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    address
  )}&appid=${process.env.URL}&units=metric`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location!', undefined);
    } else if (body.message) {
      callback('Unable to find location! Try another location.', undefined);
    } else {
      callback(undefined, {
        location: `${body.name}, ${body.sys.country}`,
        forecast: `${body.weather[0].main} throughout the day. It is currently ${body.main.temp}°C out but It feels like ${body.main.feels_like}°C out there.`,
      });
    }
  });
};

module.exports = forecast;
