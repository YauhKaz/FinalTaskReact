import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '../App.css';
import { CHENGED_FILTER } from '../store/constants';
import { fetchedFilms } from '../store/actions';
import PlusLogo from "../pictures/plus.png";

const Filter =() => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  let filter = useSelector(state => state.filter);
  let page = useSelector(state => state.buttons);
  let currentPage = page.buttons.find((button) => {if (button.isActiveButton === true) return button}).buttonName || 1;
  let currentUserId = -1;
  const currentUser = users.users.find(user => user.isAuth === true);
  if (currentUser === undefined) currentUserId = -1;
  else currentUserId = currentUser.id;

  useEffect(() => {
    if (typeof filter === 'object') {
      filter = 'popularity.desc';
      dispatch({type: CHENGED_FILTER, payload: filter});
    }
    else {
      dispatch(fetchedFilms(`https://api.themoviedb.org/3/discover/movie?api_key=f548b682cf24c37f64f1d20d7fca99e9&language=en-US&sort_by=${filter}&include_adult=false&include_video=false&page=${currentPage}`));    
    }
  }, [filter]);

  const handlerChange = (name) => {
    filter = name;
    dispatch({type: CHENGED_FILTER, payload: filter});
  }  
  return (
    <section className="selectMenu">
            <select onChange={(e) => handlerChange(e.target.value)}>
                <option className="selectMenu__choise" value="popularity.desc">None</option>
                <option className="selectMenu__choise" value="vote_average.asc">Ascending rating</option>
                <option className="selectMenu__choise" value="vote_average.desc">Descending rating</option>
                <option className="selectMenu__choise" value="release_date.asc">Ascending release date</option>
                <option className="selectMenu__choise" value="release_date.desc">Descending release date</option>
            </select>
            {currentUserId === 0 && 
            <Link to="/newfilm">
              <img className="selectMenu__newFilm" src={PlusLogo} alt="plus"/>
            </Link>
            }
    </section>
  ) 
}

export default Filter;