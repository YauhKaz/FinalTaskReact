import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CHENGED_PAGINATION} from "../store/constants";
import { fetchedFilms } from '../store/actions';

const Pagination = () => {
  const dispatch = useDispatch();
  const buttons = useSelector(state => state.buttons);
  const filter = useSelector(state => state.filter);
  const [updateData, setUpdateData] = useState([]);

  const changeButton = (id, buttonName) => {
    const temp = buttons.buttons.map(button => {
      if (button.id === id) return {...button, isActiveButton: true}
      return {...button, isActiveButton: false}
    });
    setUpdateData(temp);

    switch(id) {
      case 1: {
        // this.setState((state) => {return {...state, page: buttonName}})
        dispatch(fetchedFilms(`https://api.themoviedb.org/3/discover/movie?api_key=f548b682cf24c37f64f1d20d7fca99e9&language=en-US&sort_by=${filter}&include_adult=false&include_video=false&page=${buttonName}`));
        
        for (let i=1; i<temp.length-1; i++)
          {
            temp[i].buttonName = i+1;
          }
          temp[0].isActiveSpan = false; 
          temp[3].isActiveSpan = true;
        break;
      }
      case 2: {
        dispatch(fetchedFilms(`https://api.themoviedb.org/3/discover/movie?api_key=f548b682cf24c37f64f1d20d7fca99e9&language=en-US&sort_by=${filter}&include_adult=false&include_video=false&page=${buttonName}`)); 
        if (buttonName !== 2) {
            for (let i=1; i<temp.length-1; i++)
            {
              temp[i].buttonName--;
            }
          };    
          if (buttonName === 2) {
            temp[1].isActiveButton = true;
            for (let i=0; i<temp.length; i++)
              {
                  if (i !== 1) temp[i].isActiveButton = false;
              }
          }   
          else if (buttonName <= 12)  {
            temp[2].isActiveButton = true;
            for (let i=0; i<temp.length; i++)
            {
                if (i !== 2) temp[i].isActiveButton = false;
            }
          }     
          if (buttonName <= 12) {                
            temp[3].isActiveSpan = true;    
          };
          if (buttonName <= 3) {
            temp[0].isActiveSpan = false;  
          };      
          break;
      }
      case 3: {
        dispatch(fetchedFilms(`https://api.themoviedb.org/3/discover/movie?api_key=f548b682cf24c37f64f1d20d7fca99e9&language=en-US&sort_by=${filter}&include_adult=false&include_video=false&page=${buttonName}`));
        break;
      }
      case 4: {
        dispatch(fetchedFilms(`https://api.themoviedb.org/3/discover/movie?api_key=f548b682cf24c37f64f1d20d7fca99e9&language=en-US&sort_by=${filter}&include_adult=false&include_video=false&page=${buttonName}`));
        if (buttonName !== 14) {
            for (let i=1; i<temp.length-1; i++)
            {
              temp[i].buttonName++;
            }
          }; 
          if (buttonName === 14) {
            temp[3].isActiveButton = true;
            for (let i=0; i<temp.length; i++)
              {
                  if (i !== 3) temp[i].isActiveButton = false;
              }
          }
          else if (buttonName > 3) {
            temp[2].isActiveButton = true;
            for (let i=0; i<temp.length; i++)
              {
                  if (i !== 2) temp[i].isActiveButton = false;
              }
          }
          if (buttonName >= 13) {
            temp[3].isActiveSpan = false;                
          };
          if (buttonName > 3) {  
            temp[0].isActiveSpan = true;                 
          };         
          break;
      }
      case 5: {
        dispatch(fetchedFilms(`https://api.themoviedb.org/3/discover/movie?api_key=f548b682cf24c37f64f1d20d7fca99e9&language=en-US&sort_by=${filter}&include_adult=false&include_video=false&page=15`));
        for (let i=1; i<temp.length-1; i++)
          {
            temp[i].buttonName = i+11;
          };
          temp[0].isActiveSpan = true;
          temp[3].isActiveSpan = false;     
        break;
      }
      default: break;
    }
    buttons.buttons = temp;
    dispatch({type: CHENGED_PAGINATION, payload: buttons})
  }

  return(
    <nav className="paginationMenu">
      <ul>
        {
          buttons.buttons.map(button => (
            <>
              <li><button onClick={() => changeButton(button.id, button.buttonName)} key={button.id} className={button.isActiveButton ? "paginationButton activePaginationButton" : "paginationButton"}>{button.buttonName}</button></li>
              {button.isActiveSpan && <span className="paginationMenu__lastPaginationSpan">...</span>}
            </>
          ))
        }
      </ul>
    </nav>
  )    
    
}

export default Pagination;