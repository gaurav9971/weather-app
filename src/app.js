const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./models/weather.model');

const app = express();
const staticFiles = path.join(__dirname, '../public');
const viewsFile = path.join(__dirname, '../templates/views');
const partialsFile = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsFile);
hbs.registerPartials(partialsFile);

app.use(express.static(staticFiles));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'no address',
    });
  }

  forecast(req.query.address, (error, forecastData) => {
    if (error) {
      return res.send({ error });
    }

    res.send({
      location: forecastData.location,
      forecast: forecastData.forecast,
      address: req.query.address,
    });
  });
});

app.get('*', (req, res) => {
  res.status(404).render('404', {
    title: 'Error 404',
    header: '404. That’s an error.',
    message: 'The requested URL was not found on this server.',
  });
});

app.listen(3000, (req, res) => {
  console.log('Server is listening in 3000...');
});
