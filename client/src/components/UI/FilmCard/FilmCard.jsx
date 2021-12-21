import React from 'react';

const FilmCard = ({ film }) => (
  <div className="film-card">
    <div className="film">
      <img src={film.img} alt={film.title} />
      <div className="rating high-rating"><p>{film.rating}</p></div>
      <p className="film-name"><span data-title={film.dataAttribute}>{film.title}</span></p>
      <div className="film-description d-flex justify-content-between">
        <p>{film.date}</p>
        <p id="add-to-favourite"><span data-film-id={film.id} className="heart">&hearts;</span></p>
        <p id="delete-from-favourite"><i data-film-id={film.id} className="gg-trash" /></p>
        <p><a href="/info/{{film.id}}">More</a></p>
      </div>
    </div>
  </div>
);

export default FilmCard;
