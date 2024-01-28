import "./App.css";
import React from "react";
import HeaderComponent from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Citizens from "./pages/Citizens";
import CitizensDetails from "./pages/citizensDetails/CitizensDetails";

const App = () => {
  return (
    <div className="app">
      <HeaderComponent />
      <Routes>
        <Route path="/citizens" element={<Citizens />} />{" "}
        <Route path="/citizensDetails" element={<CitizensDetails />} />{" "}
      </Routes>{" "}
    </div>
  );
};

export default App;
