import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "components/Header";
import AddCounseling from "./AddCounseling";

export default function AddCounsel() {
  const navigate = useNavigate();
  return (
    <div>
      <HeaderComponent nav={navigate} isLogoutVisible={false}/>
      <AddCounseling />{" "}
    </div>
  );
}
