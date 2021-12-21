import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Logout from '../Logout/Logout';
import { checkSessionAC } from '../../redux/actionCreators/userAC';
import SearchFilms from '../SearchFilms/SearchFilms';
import SearchResult from '../SearchResult/SearchResult';
import FavouritesFilms from '../FavouritesFilms/FavouritesFilms';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:5000/isauth', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          dispatch(checkSessionAC(data.user));
        }
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Switch>

          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/logout">
            <Logout />
          </Route>

          <Route exact path="/registration">
            <Registration />
          </Route>

          <Route exact path="/searchresult/:type">
            <SearchResult />
          </Route>

          <Route exact path="/search">
            <SearchFilms />
          </Route>

          <PrivateRoute path="/favourites">
            <FavouritesFilms />
          </PrivateRoute>

        </Switch>

      </BrowserRouter>
    </>
  );
}

export default App;
