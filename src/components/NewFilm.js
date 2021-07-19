import React from "react";
import { Link, useHistory } from "react-router-dom";
import {useSelector} from "react-redux";
import {Formik} from "formik";
import * as yup from 'yup';

import AutorizationButton from './AutorizationButton';
import '../App.css';
import Logo from "../pictures/home.png";

const NewFilm = () => {
  const films = useSelector(state => state.films);
  const history = useHistory();

  let tempNewFilm;

  const validationShema = yup.object().shape({
    title: yup.string().typeError('Должно быть строкой').required('Обязательно').min(3, 'Короткое название'),
    overwiev: yup.string().typeError('Должно быть строкой').required('Обязательно').min(3, 'Короткое описание').max(150, 'Длинное описание'),
    poster: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    popularity: yup.number().typeError('Должно быть числом').required('Обязательно'),
    releasDate: yup.date().required('Обязательно'),
    genres: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    voteAverage: yup.number().typeError('Должно быть числом').required('Обязательно').test('','Неверная отметка', (value) => value <= 10),
    voteCount: yup.number().typeError('Должно быть числом').integer().required('Обязательно'),
  })

  return (
    <section className="App">
      <header>
        <Link to="/">
          <img className="logo" src={Logo} alt="homepage"/>
        </Link>
        <Link to='/autorization'>
          <AutorizationButton/>
        </Link>
      </header>  
      <Formik
      initialValues={{
          title: '',
          overwiev: '',
          poster: '',
          popularity: '',
          releasDate: '',   
          genres: '',
          voteAverage: '',
          voteCount: '',   
          }}
          validateOnBlur
          validationSchema={validationShema}
          onSubmit={(values) => {
            if (localStorage.getItem('newFilms') === null) tempNewFilm = [];
            else {tempNewFilm = JSON.parse(localStorage.getItem('newFilms'));}
            const changedFilms = films.map(film => { 
              let k=0;
              if (tempNewFilm !== null) {
                tempNewFilm.map(item => {
                if (item.id === film.id) k=item.id;
                })
              };
              if (k === 0) return film;
              return null;
            });
            const changeId = changedFilms.filter(item => item !== null);
            console.log(changeId);
            tempNewFilm.push({
              id: changeId[0].id,
              title: values.title,
              overview: values.overwiev,
              poster_path: values.poster,
              popularity: values.popularity,
              release_date: values.releasDate,   
              genre_ids: values.genres,
              vote_average: values.voteAverage,
              vote_count: values.voteCount, 
            });
            localStorage.setItem('newFilms', JSON.stringify(tempNewFilm));
            history.push('/');
          }
          }>
          {({values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset, isValid, dirty}) => (
            <>
              <section className="inputForm">
                <div className="inputForm__items">
                  <label forHtml="title">  Title  </label><br/>
                  <input 
                  className="inputForm__item" 
                  type={"text"} 
                  value={values.title}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'title'} 
                  />
                  {touched.title && errors.title && <p>{errors.title}</p>}
                </div> 
                <div className="inputForm__items">
                  <label forHtml="overwiev">Overwiev</label>
                  <textarea 
                  class="inputForm__item" 
                  type={"overwiev"} 
                  value={values.overwiev}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'overwiev'} 
                  />
                  {touched.overwiev && errors.overwiev && <p>{errors.overwiev}</p>}
                </div>
                <div className="inputForm__items">
                  <label forHtml="poster">Poster</label>
                  <input 
                  className="inputForm__item" 
                  type={"text"} 
                  value={values.poster}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'poster'} 
                  />
                  {touched.poster && errors.poster && <p>{errors.poster}</p>}
                </div>
                <div className="inputForm__items">
                  <label forHtml="popularity">Popularity</label>
                  <input 
                  class="inputForm__item" 
                  type={"popularity"} 
                  value={values.popularity}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'popularity'} 
                  />
                  {touched.popularity && errors.popularity && <p>{errors.popularity}</p>}
                </div>
                <div className="inputForm__items">
                  <label forHtml="releasDate">Releas date</label>
                  <input 
                  className="inputForm__item" 
                  type={"date"} 
                  value={values.releasDate}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'releasDate'} 
                  />
                  {touched.releasDate && errors.releasDate && <p>{errors.releasDate}</p>}
                </div>
                <div className="inputForm__items">
                  <label forHtml="genres">Genres</label>
                  <input 
                  className="inputForm__item" 
                  type={"text"} 
                  value={values.genres}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'genres'} 
                  />
                  {touched.genres && errors.genres && <p>{errors.genres}</p>}
                </div>
                <div className="inputForm__items">
                  <label forHtml="voteAverage">Vote average</label>
                  <input 
                  className="inputForm__item" 
                  type={"text"} 
                  value={values.voteAverage}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'voteAverage'} 
                  />
                  {touched.voteAverage && errors.voteAverage && <p>{errors.voteAverage}</p>}
                </div>
                <div className="inputForm__items">
                  <label forHtml="voteCount">Vote count</label>
                  <input 
                  className="inputForm__item" 
                  type={"text"} 
                  value={values.voteCount}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={'voteCount'} 
                  />
                  {touched.voteCount && errors.voteCount && <p>{errors.voteCount}</p>}
                </div>
                <div>
                  <button 
                    onClick={handleSubmit}
                    className="registrationForm__button signUp-button" 
                    type={"submit"} 
                    >Submit
                  </button>
                <input onClick={handleReset} className="registrationForm__button clear-button" type="button" value="Clear"/>
              </div>
              </section>
            </>
          )
        }
      </Formik>
    </section>
  )
}

export default NewFilm;