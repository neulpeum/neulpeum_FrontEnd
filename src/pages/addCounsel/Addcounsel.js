import React from "react";
import HeaderComponent from "../../components/header/Header";
import AddCounseling from "../../components/addCounseling/AddCounseling";
import { useNavigate } from "react-router-dom";

export default function AddCounsel() {
  const navigate = useNavigate();
  return (
    <div>
      <HeaderComponent nav={navigate} isLogoutVisible={false}/>
      <AddCounseling />{" "}
    </div>
  );
}
