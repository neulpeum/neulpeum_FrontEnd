import "./App.css";
import React from "react";
import HeaderComponent from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Citizens from "./pages/Citizens";
import CitizensDetails from "./pages/CitizensDetails";

const App = () => {
  return (
    <div className="app">
      <HeaderComponent />
      <Routes>
        <Route path="/citizens" element={<Citizens />} />{" "}
        <Route path="/citizensDetails" element={<CitizensDetails />} />{" "}
      </Routes>{" "}
      <Link to="/citizensDetails"> Go to Individual Page </Link>{" "}
    </div>
  );
};

export default App;
