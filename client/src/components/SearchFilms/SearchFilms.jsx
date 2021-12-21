import React from 'react';
import Title from '../UI/Title/Title';
import SearchByName from '../SearchByName/SearchByName';
import SearchByType from '../SearchByType/SearchByType';

const SearchFilms = () => (
  <main>
    <Title title="Поиск фильмов" />
    <SearchByName />
    <SearchByType />

  </main>
);

export default SearchFilms;
