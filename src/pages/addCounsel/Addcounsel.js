import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "components/Header";
import AddCounseling from "./AddCounseling";

export default function AddCounsel() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoadingUpdate = (childLoading) => {
    if (childLoading) {
      setLoading(childLoading);
    } else {
      const timer = setTimeout(() => {
        setLoading(childLoading);
      }, 500);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    const addCounselContainer = document.querySelector(".addCounsel-container");
    if (loading) {
      addCounselContainer.style.setProperty("display", "none");
    } else {
      addCounselContainer.style.setProperty("display", "block");
    }
  }, [loading]);

  return (
    <div>
      {loading && (
        <div className="loading-wrapper">
          <img src="/icons/ic_spinner.gif" alt="" />
        </div>
      )}
      <div className="addCounsel-container">
        <HeaderComponent
          nav={navigate}
          isLogoutVisible={false}
          acitveTab={"citizens"}
        />
        <div className="addCounseling">
          <AddCounseling onLoadingUpdate={handleLoadingUpdate} />
        </div>
      </div>
    </div>
  );
}
