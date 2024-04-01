import React from 'react';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const root = createRoot(document.getElementById('root'));
root.render(
<CookiesProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</CookiesProvider>
);

reportWebVitals();
