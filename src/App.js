import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Citizens from './pages/citizens/Citizens';
import Main from './pages/main/Main';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/citizens" element={<Citizens />} />
      </Routes>
    </div>
  );
};

export default App;
