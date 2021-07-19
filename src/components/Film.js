import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import '../App.css';
import BusketImage from "../pictures/basket.png";
import NoImage from "../pictures/w500null.png";
import { DELETE_FILMS } from "../store/constants";


const Film = ({film}) => {
  const users = useSelector(state => state.users);
  let films = useSelector(state => state.films);
  const dispatch = useDispatch();

  let currentUserId = -1;
  let tempFilm;
  const currentUser = users.users.find(user => user.isAuth === true);
  if (currentUser === undefined) currentUserId = -1;
  else currentUserId = currentUser.id;

  useEffect(() => {
  }, [dispatch])

  const deleteFilm = (item) => {
    if (localStorage.getItem('deletedFilms') === null) tempFilm = [];
    else {tempFilm = JSON.parse(localStorage.getItem('deletedFilms'));}
    tempFilm.push({
      number: tempFilm.length,
      id: Number(item),
    });
    localStorage.setItem('deletedFilms', JSON.stringify(tempFilm));
    let temp = films.filter(currentFilm => currentFilm.id !== item);
    dispatch({type: DELETE_FILMS, payload: temp});
  }

  const choiseImage = (poster_path) => {
    if (poster_path !== null) return `https://image.tmdb.org/t/p/w500${poster_path}`;
    return NoImage;
  }

  return (
    <div className="filmCard__wrapper">
      <Link to={`/сhosedFilm/${film.id}`}>
        <div className="filmCard">
          <div className="filmsMenu__images">
            <img className="filmsMenu__filmCard-image" src={choiseImage(film.poster_path)} alt="film-image"/>
          </div>                
          <div className="filmsMenu__filmCard-text">
            <h4 className="release_date">
              {film.release_date}
            </h4>
            <p className="vote_rating">
              {film.vote_average}
            </p>
          </div>
        </div>
      </Link>
      {currentUserId === 0 && <img onClick={() => deleteFilm(film.id)} className="filmsMenu__bascket-image" src={BusketImage} alt="bascket"/>}
    </div>
  )  
}

export default Film;