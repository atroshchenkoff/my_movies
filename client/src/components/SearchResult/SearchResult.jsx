import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Title from '../UI/Title/Title';
import FilmCard from '../UI/FilmCard/FilmCard';
import getMovieObjectToRender from '../../utils/getMovieObjectToRender';
import { getTitleName } from '../../utils/getTitleName';
import { fetchFilms } from '../../utils/fetchFilms';
import Pagination from '../UI/Pagination/Pagination';
import Loader from '../UI/Loader/Loader';

const SearchResult = () => {
  const queryInput = useSelector(state => state.queryReducer.query);
  const searchType = useParams().type;
  const title = getTitleName(searchType);

  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResultFilms = async (pageToFetch) => {
    
    const response = await fetchFilms(searchType, queryInput, pageToFetch);

    const totalPages = response.data.total_pages < 20 ? response.data.total_pages : 20;
    setTotalPages(totalPages);

    const filmsResultFromDB = response.data.results;
    return filmsResultFromDB;
  };

  const handlePageClick = async (data) => {
    const selectedPage = data.selected + 1;
    setPage(selectedPage);
  }

  useEffect(() => {
    (async () => {
      const films = await fetchResultFilms(page);
      setFilms(films);
    })();
  }, [page]);

  return (
    <div className="container">
      <Title title={title} />
      {
        films.length
          ? (
            <>
              <div className="movies">
                {films.filter((film) => !!film.poster_path ).map((film) => (
                  <FilmCard
                    key={film.id}
                    film={getMovieObjectToRender(film)}
                  />
                ))}
              </div>
              <Pagination handlePageClick={handlePageClick} totalPages={totalPages} />
            </>
            
          )
          : <div className="center-block"><Loader /></div>
      }
    </div>
  );
};

export default SearchResult

