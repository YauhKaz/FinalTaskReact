import { ADD_USER, CHANGE_USER} from "../constants";
import { READ_USER } from "../constants";
import {FETCHED_FILMS, DELETE_FILMS, CHENGED_PAGINATION, CHENGED_FILTER, UPDATE_FILMS} from "../constants";

export const addUser = (value) => ({
  type: ADD_USER,
  payload: value,
});

export const changeUser = (value) => ({
  type: CHANGE_USER,
  payload: value,
});

export const readUser = (value) => ({
  type: READ_USER,
  payload: value,
});



export function fetchedFilmsSuccess(films){
  return {
    type: FETCHED_FILMS,
    films
  }
}

export function fetchedFilms(url) {
  return (dispatch) => {
    //'https://api.themoviedb.org/3/discover/movie?api_key=f548b682cf24c37f64f1d20d7fca99e9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response
      })
      .then(response => response.json())
      .then(films => {

        let tempNewFilms = JSON.parse(localStorage.getItem('newFilms'));
        let tempFilm = JSON.parse(localStorage.getItem('deletedFilms'));
        let tempEditFilms = JSON.parse(localStorage.getItem('editFilms'));
        

        let tempEditFilm = films.results.map(film => {
          let k=0;
          let updateFilm = {};
          if (tempEditFilms !== null) {
            tempEditFilms.map(item => {
            if (item.id === film.id) {k=item.id;
              updateFilm = item;}
            })
          }
          if (k === 0) return film;
          return updateFilm;
        });

        let tempNewFilm = tempEditFilm.map(film => {
          let k=0;
          let updateFilm = {};
          if (tempNewFilms !== null) {
            tempNewFilms.map(item => {
            if (item.id === film.id) {k=item.id;
              updateFilm = item;}
            })
          }
          if (k === 0) return film;
          return updateFilm;
        });        
        
        let temp = tempNewFilm.map(film => {
          let k=0;
          if (tempFilm !== null) tempFilm.map(item => {if (item.id === film.id) k++ })
          if (k === 0) return film;
          return null;
        });
        let finalDeleteList = temp.filter(item => item !== null);

        dispatch(fetchedFilmsSuccess(finalDeleteList))
      })
  }
}

export function updateFilms(value){
  return {
    type: UPDATE_FILMS,
    payload: value,
  }
}

export function deletedFilms(value){
  return {
    type: DELETE_FILMS,
    payload: value,
  }
}

export const handlePagination = (value) => ({
  type: CHENGED_PAGINATION,
  payload: value,
});

export const chengeFilter = (value) => ({
  type: CHENGED_FILTER,
  payload: value,
})

