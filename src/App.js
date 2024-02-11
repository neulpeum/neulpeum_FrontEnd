import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Medicines from './pages/medicines/Medicines';

import Citizens from "./pages/citizens/Citizens";
import CitizensDetails from "./pages/citizensDetails/CitizensDetails";
import CitizenAdd from "./components/citizenAdd/CitizenAdd";
import Main from './pages/main/Main';



const App = () => {
  return (
    <div className="app">
      <GlobalStyles/>
      <Routes>
        <Route path="/" element={<Main />} />{" "}
        <Route path="/citizens" element={<Citizens />} />{" "}
        <Route path="/citizensDetails" element={<CitizensDetails />} />{" "}
        <Route path="/medicines" element={<Medicines />} />{" "}
        <Route path="/citizenAdd" element={<CitizenAdd />} />{" "}
      </Routes>{" "}
    </div>
  );
};

export default App;
