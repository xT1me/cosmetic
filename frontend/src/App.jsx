import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Main from './components/Main/Main.jsx';
import { checkAuth, logout, register } from './api/auth/auth.js';
import useLocalStorage from './hooks/useLocalStorage.js';


const App = () => {
  const [isAuth, setAuth] = useState(null)
  const [username, setUsername] = useState(null)
  const [userId, setUserId] = useState(null)
  const [cartItems, setCartItems] = useLocalStorage('cartItems', [])

  const checkIsAuth = async () => {
    try {
      const userData = await checkAuth()

      if (userData) {
        setUsername(userData.username)
        setUserId(userData.id)
        setAuth(true)
      } else {
        logout()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkIsAuth()
  }, [])

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, count: i.count + item.count } : i
        );
      }
      return [...prevItems, item];
    });
  };

  return (
    <div className="App">
      <Header 
        isAuth={isAuth} 
        setAuth={setAuth} 
        username={username} 
        setUsername={setUsername}
        setUserId={setUserId}
        cartItems={cartItems}
        userId={userId}
      />
      <Main onAddToCart={handleAddToCart} username={username} />
      <Footer />
    </div>
  );
};

export default App