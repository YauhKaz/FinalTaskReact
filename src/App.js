import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Link } from "react-router-dom";

import './App.css';
import Logo from "./pictures/home.png";
import Filter from './components/Filter';
import Films from './components/Films';
import NewFilm from './components/NewFilm';
import AutorizationButton from './components/AutorizationButton';
import Pagination from './components/Pagination';
import ChosedFilm from './components/ChosedFilm';
import AutorizationForm from './components/AutorizationForm';
import RegistrationForm from './components/RegistrationForm';


import { fetchedFilms } from './store/actions';

function App() {
  const dispatch = useDispatch();
  let filter = useSelector(state => state.filter);

  useEffect(() => {
 }, [dispatch]);

 const handleStartPage = () => {
  dispatch(fetchedFilms(`https://api.themoviedb.org/3/discover/movie?api_key=f548b682cf24c37f64f1d20d7fca99e9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`));
 }

  return (
    <BrowserRouter>
      <Route exact path='/'>
        <section className="App">
          <header>
            <Link to="/">
              <img onClick={handleStartPage} className="logo" src={Logo} alt="homepage"/>
            </Link>
            <AutorizationButton/>
          </header>
          <Filter />
          <Films />
          <Pagination
                />
        </section>
      </Route>
      <Route exact path='/сhosedFilm/:id'>
        <ChosedFilm />
      </Route>  
      <Route exact path='/autorization'>
        <AutorizationForm/>
      </Route>
      <Route exact path='/registration'>
            <RegistrationForm />
      </Route>
      <Route exact path='/newfilm'>
        <NewFilm />
      </Route> 
      <footer>
        
      </footer>
    </BrowserRouter>
  );
}

export default App;
