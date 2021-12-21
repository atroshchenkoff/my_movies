/* eslint-disable no-await-in-loop */
const express = require('express');
const { CommentMovie } = require('../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { movieId, comment } = req.body;
    const userId = req.session.user.id;

    const commentedMovie = await CommentMovie.create({
      UserId: userId,
      movieId,
      text: comment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).end();
  }

  res.json({ isFilmCommented: true });
});

module.exports = router;
