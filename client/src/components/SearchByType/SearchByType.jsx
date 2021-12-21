import React from 'react';
import { useHistory } from 'react-router';

const SearchByType = () => {
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    const type = event.target.type.value;
    history.push(`/searchresult/${type}`)
  }

  return (
    <form id="searchByTypeForm" onSubmit={onSubmit} className="mb-3">
      <div className="mb-3">
        <label htmlFor="searchByType" className="form-label">По типу</label>
        <select className="form-select" name="type" aria-label="Default select example" id="searchByType">
          <option defaultValue="popular">Популярные</option>
          <option value="top_rated">Топ рейтинг</option>
          <option value="upcoming">Новинки</option>
          <option value="now_playing">Сейчас на экранах</option>
        </select>
      </div>
      <button type="submit" className="btn btn-block">Найти</button>
    </form>
  );
} 

export default SearchByType;
