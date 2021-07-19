import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Formik} from "formik";
import * as yup from 'yup';

import '../App.css'; 
import Logo from "../pictures/home.png";
import LogoBack from "../pictures/back.png";
import { ADD_USER } from '../store/constants';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const history = useHistory();

  const validationShema = yup.object().shape({
    name: yup.string().typeError('Должно быть строкой').required('Обязательно').min(6, 'Короткое имя'),
    surname: yup.string().typeError('Должно быть строкой').required('Обязательно').min(6, 'Короткая фамилия'),
    password: yup.string().typeError('Должно быть строкой').required('Обязательно').min(6, 'Короткий пароль'),
    passwordDouble: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательно'),
    mail: yup.string().email('Введите верный email').required('Обязательно'),
  })

  return (
    <section className="App">
      <header>
        <Link to="/">
          <img className="logo" src={Logo} alt="homepage"/>
        </Link>
        <Link to="/autorization">
          <img className="logo" src={LogoBack} alt="homepage"/>
        </Link>
      </header>
      <section className="registration">
        <h2>
          Registration
        </h2>
        <Formik
          initialValues={{
          name: '',
          surname: '',
          password: '',
          passwordDouble: '',
          mail: '',        
          }}
          validateOnBlur
          validationSchema={validationShema}
          onSubmit={(values) => {
            const {name, mail, password} = values;
            let k=0;
            users.users.map(item => {
              if (mail === item.mail) k++;
            })
            if (k !== 0) alert("Уже создан");
            else {
              dispatch({type: ADD_USER, payload: {
                id: users.users.length,
                name,
                mail,
                password,
                isAuth: false,
              }});
              console.log("bfhbewbwfnkwenfnwenfl");
              history.push("/autorization");
            }            
          }
          }>
          {({values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset, isValid, dirty}) => (
          <>
            <div className="registration__form">            
              <div className="registrationForm__item">
                <label htmlFor="name"> Name</label>
                <input 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  className={"registrationForm__input"} 
                  type={"text"} 
                  value={values.name}
                  name={'name'} 
                />
                {touched.name && errors.name && <p>{errors.name}</p>}
              </div> 
              <div className="registrationForm__item">
                <label htmlFor="surname">Surname</label>
                <input 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  className={"registrationForm__input"} 
                  type={"text"} 
                  value={values.surname}
                  name={'surname'} 
                />
                {touched.surname && errors.surname && <p>{errors.surname}</p>}
              </div> 
              <div className="registrationForm__item">
                <label htmlFor="password">Password</label>
                <input 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  className={"registrationForm__input"} 
                  type={"password"} 
                  value={values.password}
                  name={'password'} 
                />
                {touched.password && errors.password && <p>{errors.password}</p>}
              </div> 
              <div className="registrationForm__item">
                <label htmlFor="passwordDouble">Confirm password</label>
                <input 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  className={"registrationForm__input"} 
                  type={"password"} 
                  value={values.passwordDouble}
                  name={'passwordDouble'} 
                />
                {touched.passwordDouble && errors.passwordDouble && <p>{errors.passwordDouble}</p>}
              </div> 
              <div className="registrationForm__item">
                <label htmlFor="mail">Email</label>
                <input 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  className={"registrationForm__input"} 
                  type={"email"} 
                  value={values.mail}
                  name={'mail'} 
                />
                {touched.mail && errors.mail && <p>{errors.mail}</p>}
              </div> 
              <div>
                <Link to='/autorization'>
                  <button 
                    onClick={handleSubmit}
                    className="registrationForm__button signUp-button" 
                    type={"submit"} 
                    >Sign Up
                  </button>
                </Link>
                <input onClick={handleReset} className="registrationForm__button clear-button" type="button" value="Clear"/>
              </div>        
            </div>
          </>
      )}  
        
      </Formik>
    </section>
    </section>
  )
}

export default RegistrationForm;