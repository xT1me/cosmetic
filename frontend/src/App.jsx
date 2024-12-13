import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Main from './components/Main/Main.jsx';
import { checkAuth } from './api/auth/auth.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import { getUserById } from './api/users/users.js';
import { userActions } from './components/redux/user/userActions.js';
import { useDispatch, useSelector } from 'react-redux';


const App = () => {
  const dispatch = useDispatch()
  const userReducer = new userActions(dispatch)

  useEffect(async () => {
    checkIsAuth()
  }, []);

  const checkIsAuth = async () => {
    try {
      const authData = await checkAuth()
      authData ? userReducer.setUser(authData.userId) : userReducer.logoutAccount()
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App