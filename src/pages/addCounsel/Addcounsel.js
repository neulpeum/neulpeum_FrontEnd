import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "components/Header";
import AddCounseling from "./AddCounseling";

export default function AddCounsel() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoadingUpdate = (childLoading) => {
    setLoading(childLoading);
  };

  useEffect(() => {
    const addCounseling = document.querySelector(".addCounseling");

    if (loading) {
      addCounseling.style.setProperty("display", "none");
    } else {
      addCounseling.style.setProperty("display", "block");
    }
  }, [loading]);

  return (
    <div>
      <HeaderComponent nav={navigate} isLogoutVisible={false} />
      {loading && (
        <div className="loading-wrapper">
          <img src="/icons/ic_spinner2.gif" alt="" />
        </div>
      )}
      <div className="addCounseling">
        <AddCounseling onLoadingUpdate={handleLoadingUpdate} />
      </div>
    </div>
  );
}
