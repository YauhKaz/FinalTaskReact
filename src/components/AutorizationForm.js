import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import AutorizationButton from './AutorizationButton';
import Logo from "../pictures/home.png";
import '../App.css'; 
import { CHANGE_USER } from "../store/constants";


const AutorizationForm = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleRead = (event) => {
    event.preventDefault();    
    let auth = false;
    const temp = users.users.map(user => {
      if (user.password === password && user.mail === mail) {
        auth = true;
        return {...user, isAuth: true};
       }
      return {...user};
    })
    users.users = temp;
    dispatch({type: CHANGE_USER, payload: users});
    if (auth === true) history.push("/");
    else alert("alarm"); 
  }
  
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
        <section className="signIn">
          <p>
              Sign In
          </p>
          <form onSubmit={(event) => handleRead(event)}  className="signIn__form">
            <div className="signIn__item">
              <label htmlFor="email"> Email</label>
              <input onChange={(event) => setMail(event.target.value)} className="signMail" type="email" value={mail} placeholder="your@mail" required/>
            </div>
            <div className="signIn__item">
              <label htmlFor="Password"> Password</label>
              <input onChange={(event) => setPassword(event.target.value)} className="signPassword" type="password" value={password} placeholder="Password" required/>
            </div>
            <div className="signIn__buttons">
              <button className="signIn__button signButton" type="submit" value="Sign">
                Sign
              </button>
              <Link to="/registration">
                <input className="signIn__button registrationButton" type="button" value="Registration"/>
              </Link>              
            </div>
          </form>
        </section>
    </section>      
  )
}

export default AutorizationForm;