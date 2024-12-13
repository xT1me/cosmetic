import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Provider } from "react-redux";
import store from './components/redux/index.js';
import ThemeProvider from './providers/ThemeProvide.jsx';

ReactDOM.render(
  <ThemeProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);