import "./App.css";
import React from "react";
import HeaderComponent from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import Medicines from './pages/Medicines';

import { Link } from "react-router-dom";
import Citizens from "./pages/citizens/Citizens";
import CitizensDetails from "./pages/citizensDetails/CitizensDetails";
import Main from './pages/main/Main';


const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />{" "}
        <Route path="/citizens" element={<Citizens />} />{" "}
        <Route path="/citizensDetails" element={<CitizensDetails />} />{" "}
        <Route path="/medicines" element={<Medicines />} />{" "}
      </Routes>{" "}
    </div>
  );
};

export default App;
