const express = require('express');
const axios = require('axios');
const getMovieObjectToRender = require('../utils/getMovieObjectToRender');

const router = express.Router();
let filmsResult = [];

router.route('/')
  .get((req, res) => {
    try {
      res.render('search');
    } catch (error) {
      console.log(error.message);
      res.status(500).end();
    }
  });

router.get('/results', async (req, res) => {
  try {
    res.render('index', { filmsResult, resultTitle: 'Результаты поиска' });
  } catch (error) {
    console.log(error.message);
    res.status(500).end();
  }
});
router.route('/byName')
  .post(async (req, res) => {
    try {
      const { filmInput } = req.body;
      const response = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ru&page=1&include_adult=false&query=${filmInput}`);
      const filmsFromDB = response.data.results;
      filmsResult = filmsFromDB.map((film) => getMovieObjectToRender(film, res.locals.isAuth));

      res.json({ didFindResults: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).end();
    }
  });

router.route('/byType')
  .post(async (req, res) => {
    try {
      const { type } = req.body;

      const response = await axios(`https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.API_KEY}&language=ru`);
      const filmsFromDB = response.data.results;

      filmsResult = filmsFromDB.map((film) => getMovieObjectToRender(film, res.locals.isAuth));

      res.json({ didFindResults: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).end();
    }
  });
module.exports = router;
