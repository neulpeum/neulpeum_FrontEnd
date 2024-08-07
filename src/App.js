import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Drugs from "pages/drugs/Drugs";
import Citizens from "pages/citizens/Citizens";
import CitizensDetails from "pages/citizensDetails/CitizensDetails";
import CitizenAdd from "pages/citizenAdd/CitizenAdd";
import Main from "pages/main/Main";
import AddCounsel from "pages/addCounsel/AddCounsel";
import AccountSetting from "pages/accountSettings/AccountSettings";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />{" "}
        <Route path="/citizens" element={<Citizens />} />{" "}
        <Route path="/citizensDetails" element={<CitizensDetails />} />{" "}
        <Route path="/addCounsel" element={<AddCounsel />} />{" "}
        <Route path="/citizenAdd" element={<CitizenAdd />} />{" "}
        <Route path="/drugs" element={<Drugs />} />{" "}
        <Route path="/accountSettings" element={<AccountSetting />} />{" "}
      </Routes>{" "}
    </div>
  );
};

export default App;
