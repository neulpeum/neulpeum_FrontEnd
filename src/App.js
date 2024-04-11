import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Drugs from "pages/drugs/Drugs";
import Citizens from "pages/citizens/Citizens";
import CitizensDetails from "pages/citizensDetails/CitizensDetails";
import CitizenAdd from "pages/citizenAdd/CitizenAdd";
import Main from "pages/main/Main";
import Options from "pages/options/Options";
import AddCounsel from "pages/addCounsel/Addcounsel";
import AccountSetting from "pages/accountSettings/AccountSettings";
import LoginWrapper from "components/LoginWrapper";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LoginWrapper content={<Main />} />} />{" "}
        <Route path="/citizens" element={<Citizens />} />{" "}
        <Route path="/citizensDetails" element={<CitizensDetails />} />{" "}
        <Route path="/options" element={<LoginWrapper content={<Options />} />} />{" "}
        <Route path="/addCounsel" element={<AddCounsel />} />{" "}
        <Route path="/citizenAdd" element={<CitizenAdd />} />{" "}
        <Route path="/drugs" element={<Drugs />} />{" "}
        <Route path="/accountSettings" element={<AccountSetting />} />{" "}
      </Routes>{" "}
    </div>
  );
};

export default App;
