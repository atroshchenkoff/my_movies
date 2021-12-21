/* eslint-disable no-await-in-loop */
const express = require('express');
const axios = require('axios');
const getMovieObjectToRender = require('../utils/getMovieObjectToRender');
const { FavouriteMovie } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const userId = req.session.user.id;
    const userFilmsFromModel = await FavouriteMovie.findAll({ where: { UserId: userId } });
    const userFilmsId = userFilmsFromModel.map((model) => model.movieId);
    const orderedFilmsId = userFilmsId.reverse(); // place films in order by date of made favourites

    const userFilms = [];

    for (let i = 0; i < orderedFilmsId.length; i += 1) {
      const response = await axios(`https://api.themoviedb.org/3/movie/${orderedFilmsId[i]}?api_key=${process.env.API_KEY}&language=ru`);
      const userFilm = getMovieObjectToRender(response.data);
      userFilm.isDeleteBtn = true;
      userFilms.push(userFilm);
    }
    console.log(userFilms);
    res.render('index', { filmsResult: userFilms, resultTitle: 'Мои любимые фильмы' });
  } catch (error) {
    console.log(error.message);
    res.status(500).end();
  }
});

router.post('/', async (req, res) => {
  try {
    const { filmId } = req.body;
    const userId = req.session.user.id;

    const isUserLikedFilm = await FavouriteMovie.findOne({
      where: {
        UserId: userId, movieId: filmId,
      },
    });

    if (!isUserLikedFilm) {
      const favouriteFilm = await FavouriteMovie.findOrCreate({
        where: {
          UserId: userId, movieId: filmId,
        },
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).end();
  }

  res.json({ isFilmAddedToFavourite: true });
});

router
  .route('/:id')
  .delete(async (req, res) => {
    try {
      const filmId = req.params.id;
      const UserId = req.session.user.id;
      await FavouriteMovie.destroy(
        {
          where: {
            UserId,
            movieId: +filmId,
          },
        },
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).end();
    }
    res.json({ isDeleted: true });
  });

module.exports = router;
