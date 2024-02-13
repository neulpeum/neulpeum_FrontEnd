import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Drugs from './pages/drugs/Drugs';

import { Link } from "react-router-dom";
import Citizens from "./pages/citizens/Citizens";
import CitizensDetails from "./pages/citizensDetails/CitizensDetails";
import Main from './pages/main/Main';



const App = () => {
  return (
    <div className="app">
      <GlobalStyles/>
      <Routes>
        <Route path="/" element={<Main />} />{" "}
        <Route path="/citizens" element={<Citizens />} />{" "}
        <Route path="/citizensDetails" element={<CitizensDetails />} />{" "}
        <Route path="/drugs" element={<Drugs />} />{" "}
      </Routes>{" "}
    </div>
  );
};

export default App;
