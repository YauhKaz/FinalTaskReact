import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../App.css';
import { CHANGE_USER } from "../store/constants";

function AutorizationButton() {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const [autorization, setAutorization] = useState(false);
  const [name, setName] = useState('');
  
  useEffect(() =>{
    const user = users.users.find(user => user.isAuth === true);
    if (user !== undefined) {
      setName(user.name);
      setAutorization(true);
    }
    else {
      setName('');
      setAutorization(false);
    }
  },[])

  const checkAutorization = (autorization) => {
    if (autorization === false) return 'Sign In/Sign Up';
    return 'SingOut';
  }

  const changeAutorization = (autorization) => {
    let auth = false;
    if (autorization === true) {
      setName('');
      setAutorization(false);
      const temp = users.users.map(user => {
        if (user.isAuth === true) {auth = true; return {...user, isAuth: false}} 
        return {...user}
      })
      users.users = temp;
      console.log('logout');
      dispatch({type: CHANGE_USER, payload: users});
      if (auth === true) window.location.href ="/";
    }
  }

  return (
    <div className="header__authorization">
      <span id="authorizationName">{name}</span>
      <Link onClick={() => changeAutorization(autorization)} to={autorization === false && "/autorization"}>
        <button className="authorizationButton">{checkAutorization(autorization)}</button>
      </Link>
    </div>
  );
}

export default AutorizationButton;