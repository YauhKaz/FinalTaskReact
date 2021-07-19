import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';
import {Formik} from "formik";
import * as yup from 'yup';

import '../App.css';
import Logo from "../pictures/back.png";
import DeleteIcon from "../pictures/delete_icon.png";
import EditIcon from "../pictures/edit-pen-pencil.png";
import NoImage from "../pictures/w500null.png";
import { DELETE_FILMS } from "../store/constants";

function ChosedFilm() {
  const films = useSelector(state => state.films);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();
  const [edit, setEdit] = useState(false); 
  
  let tempEditFilm;
  
  const validationShema = yup.object().shape({
    title: yup.string().typeError('Должно быть строкой').required('Обязательно').min(3, 'Короткое название'),
    overwiev: yup.string().typeError('Должно быть строкой').required('Обязательно').min(3, 'Короткое описание').max(500, 'Длинное описание'),
    poster: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    popularity: yup.number().typeError('Должно быть числом').required('Обязательно'),
    releasDate: yup.date().required('Обязательно'),
    genres: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    voteAverage: yup.number().typeError('Должно быть числом').required('Обязательно').test('','Неверная отметка', (value) => value <= 10),
    voteCount: yup.number().typeError('Должно быть числом').integer().required('Обязательно'),
  })

  const film = films.find((item) => item.id === Number(id));
  let currentUserId = -1;
  let tempFilm;
  const currentUser = users.users.find(user => user.isAuth === true);
  if (currentUser === undefined) currentUserId = -1;
  else currentUserId = currentUser.id;

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
    history.push('/');
  }

  const editFilm = () => {
    edit === false ? setEdit(true) : setEdit(false);
  }

  const choiseImage = (poster_path) => {
    if (poster_path !== null) return `https://image.tmdb.org/t/p/w500${poster_path}`;
    return NoImage;
  }
  
  return (
    <section className="App">
    <header>
      <Link to="/">
        <img className="logo" src={Logo} alt="homepage"/>
      </Link>
    </header>
    <Formik
      initialValues={{
          id: film.id,
          title: film.title,
          overwiev: film.overview,
          poster: film.poster_path,
          popularity: film.popularity,
          releasDate: film.release_date,   
          genres: String(film.genre_ids),
          voteAverage: film.vote_average,
          voteCount: film.vote_count,   
          }}
          validateOnBlur
          validationSchema={validationShema}
          onSubmit={(values) => {
            let editFilms;
            let updateFilm = {};
            let k=0;
            if (localStorage.getItem('editFilms') === null) tempEditFilm = [];
            else {tempEditFilm = JSON.parse(localStorage.getItem('editFilms'));}
            editFilms = tempEditFilm.map(item => {
              if (item.id === values.id) {
                k++;
                return {
                  id: values.id,
                  title: values.title,
                  overview: values.overwiev,
                  poster_path: values.poster,
                  popularity: values.popularity,
                  release_date: values.releasDate,   
                  genre_ids: values.genres,
                  vote_average: values.voteAverage,
                  vote_count: values.voteCount, 
                };
              }
              return item;
            });
            if (k === 0) {
              updateFilm = {
                id: values.id,
                title: values.title,
                overview: values.overwiev,
                poster_path: values.poster,
                popularity: values.popularity,
                release_date: values.releasDate,   
                genre_ids: values.genres,
                vote_average: values.voteAverage,
                vote_count: values.voteCount, 
              };
              tempEditFilm.push(updateFilm); 
            }
            else {
              tempEditFilm = editFilms;
            }
            localStorage.setItem('editFilms', JSON.stringify(tempEditFilm));
            history.push('/');
            }
          }>
          {({values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset, isValid, dirty}) => (
            <>
              <section className="information">
                <img className="information__image" src = {choiseImage(film.poster_path)} alt="film image"/>
                <div className="information__action-images"> 
                  {currentUserId === 0 && <img id="deleteButton" onClick={() => deleteFilm(id)} className="information__image-edit" src = {DeleteIcon}/>}
                  {currentUserId === 0 && <img id="editButton" onClick={() => editFilm()} className="information__image-edit" src = {EditIcon}/>}
                </div>
                <ul className="information__items">
                  <p>Title:</p>
                  <li className="information__item information__title" aria-placeholder="Title">{film.title}</li>
                  {edit === true && 
                  <input 
                  className="inputForm__item" 
                  type={"text"} 
                  value={values.title}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'title'} 
                  />}
                  {touched.title && errors.title && <p>{errors.title}</p>}                  
                  <p>Overview:</p>
                  <li className="information__item information__overview">{film.overview}</li>
                  {edit === true && 
                  <textarea 
                  className="inputForm__item" 
                  type={"overwiev"} 
                  value={values.overwiev}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'overwiev'} 
                  />}
                  {touched.overwiev && errors.overwiev && <p>{errors.overwiev}</p>}
                  <p>Genre:</p>
                  <li className="information__item information__genres">{film.genre_ids}</li>
                  {edit === true && 
                  <input 
                  className="inputForm__item" 
                  type={"text"} 
                  value={String(values.genres)}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'genres'} 
                  />}
                  {touched.genres && errors.genres && <p>{errors.genres}</p>}
                  <p>Popularity:</p>
                  <li className="information__item information__popularity">{film.popularity}</li>
                  {edit === true && 
                  <input 
                  class="inputForm__item" 
                  type={"popularity"} 
                  value={values.popularity}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'popularity'} 
                  />}
                  {touched.popularity && errors.popularity && <p>{errors.popularity}</p>}
                  <p>Release date:</p>
                  <li className="information__item information__release-date">{film.release_date}</li>
                  {edit === true && 
                  <input 
                  className="inputForm__item" 
                  type={"date"} 
                  value={values.releasDate}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'releasDate'} 
                  />}
                  {touched.releasDate && errors.releasDate && <p>{errors.releasDate}</p>}
                  <p>Vote average:</p>
                  <li className="information__item information__vote_average">{film.vote_average}</li>
                  {edit === true && 
                  <input 
                  className="inputForm__item" 
                  type={"text"} 
                  value={values.voteAverage}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'voteAverage'} 
                  />}
                  {touched.voteAverage && errors.voteAverage && <p>{errors.voteAverage}</p>}
                  {currentUserId > 0 && <form className="vote__input">
                    <input type="text" id="input-vote" placeholder="your vote" />
                    <input className="input__button" type="button" value="Ok"/>
                  </form>}
                  <p>Vote count:</p>
                  <li className="information__item information__vote_count">{film.vote_count}</li>
                  {edit === true && 
                  <input 
                  className="inputForm__item" 
                  type={"text"} 
                  value={values.voteCount}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'voteCount'} 
                  />}
                  {touched.voteCount && errors.voteCount && <p>{errors.voteCount}</p>}
                  {edit === true && <div className="information__item-input">
                    <button 
                      onClick={handleSubmit} 
                      className="information__item-input-button" 
                      type={"submit"}
                    >Edit
                    </button>
                    <input onClick={handleReset} className="information__item-input-button" type="button" value="Return"/>
                  </div>}
                </ul>
              </section>
            </>
      
          )
        }
    </Formik>
    </section>
  );
}

export default ChosedFilm;