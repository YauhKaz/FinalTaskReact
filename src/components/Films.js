import React from "react";
import { useSelector } from "react-redux";

import Film from "./Film";
import '../App.css';


const Films = () => {  
  let films = useSelector(state => state.films);
  if (films.length === undefined) films = [];
  return (
    <section className="filmsMenu">
      {
        films.map(film => 
          <Film   film={film} 
                    key={film.id }/>
        )
      }      
    </section>
  )      
}

export default Films