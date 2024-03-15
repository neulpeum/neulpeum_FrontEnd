import React from 'react';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById('root')
);

reportWebVitals();
