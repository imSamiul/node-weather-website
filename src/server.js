const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { currentTemp, fiveDaysForecast } = require('./utils/weather');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Mead',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Andrew Mead',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Andrew Mead',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address || !req.query.country) {
    return res.send({
      error: 'You must provide an address!',
    });
  }
  currentTemp(req.query.address, req.query.country, (error, data) => {
    if (error) {
      return res.send({
        error: `Error : ${error}`,
      });
    }
    const { lon, lat } = data.coord;
    fiveDaysForecast(lon, lat, (error2, data2) => {
      if (error) {
        return res.send({
          error: `Error : ${error2}`,
        });
      }
      const forecastList = data2.list;
      const nextForecastList = forecastList.filter((forecast) => {
        const date = new Date(forecast.dt_txt);
        const timeInMilliseconds = date.getTime();

        return timeInMilliseconds > Date.now();
      });
      const nextForecast = nextForecastList[0];

      if (nextForecast) {
        return res.send({
          forecast: nextForecast.weather[0].description,
          location:
            req.query.address[0].toUpperCase() + req.query.address.slice(1),
          address: req.query.country,
          temp: data.main.temp,
        });
      }
      console.log('Nothing to forecast');
      return null;
    });
    return null;
  });
  return null;
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);
  return res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found.',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
