import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Medicines from "./pages/medicines/Medicines";

import { Link } from "react-router-dom";
import Citizens from "./pages/citizens/Citizens";
import CitizensDetails from "./pages/citizensDetails/CitizensDetails";
import AddCounsel from "./pages/addCounsel/Addcounsel";
import Main from "./pages/main/Main";

const App = () => {
  return (
    <div className="app">
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Main />} />{" "}
        <Route path="/citizens" element={<Citizens />} />{" "}
        <Route path="/citizensDetails" element={<CitizensDetails />} />{" "}
        <Route path="/medicines" element={<Medicines />} />{" "}
        <Route path="/addCounsel" element={<AddCounsel />} />{" "}
      </Routes>{" "}
    </div>
  );
};

export default App;
