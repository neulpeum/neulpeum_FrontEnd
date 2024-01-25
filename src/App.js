import './App.css';
import React from 'react';
import HeaderComponent from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import Citizens from './pages/Citizens';

const App = () => {
  return (
    <div className="app">
      <HeaderComponent/>
      <Routes>
        <Route path="/citizens" element={<Citizens />} />
      </Routes>
    </div>
  );
};

export default App;