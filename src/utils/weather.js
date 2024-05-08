const request = require('postman-request');

const currentTemp = (address, country, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    address,
    country,
  )}&appid=115c863e9843bc5596258a694b32be15&units=metric`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable connect to the server', undefined);
    } else if (response.statusCode === 404) {
      callback('Location not found.', undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};
const fiveDaysForecast = (longitude, latitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=115c863e9843bc5596258a694b32be15&units=metric`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to the server', undefined);
    } else if (response.statusCode === 404) {
      callback('Location not found', undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};
module.exports = {
  currentTemp,
  fiveDaysForecast,
};
