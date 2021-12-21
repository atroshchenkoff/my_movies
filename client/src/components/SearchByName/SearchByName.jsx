import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { queryAC } from '../../redux/actionCreators/queryAC';

const SearchByName = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    const query = event.target.filmInput.value;
    dispatch(queryAC(query.trim()))
    history.push('/searchresult/byName')
  }

  return (
    <form id="searchByNameForm" onSubmit={onSubmit} className="mb-3">
      <div className="mb-3">
        <label htmlFor="searchByName" className="form-label">По названию</label>
        <input name="filmInput" required type="text" className="form-control" id="searchByName" />
      </div>
      <button type="submit" className="btn btn-block">Найти</button>
    </form>
  );
} 

export default SearchByName;
