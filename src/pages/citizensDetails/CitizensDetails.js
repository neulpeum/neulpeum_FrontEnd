import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "components/Header";
import CitizenInfor from "./CitizenInfor";
import CitizenCounselList from "./CitizenCounselList";
import "styles/ForPages/CitizensDetails/CitizensDetails.css";

const CitizensDetails = () => {
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingInfor, setLoadingInfor] = useState(true);
  const [loadingCounselList, setLoadingCounselList] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleInforLoadingUpdate = (childLoading) => {
    setLoadingInfor(childLoading);
  };

  const handleCounselListLoadingUpdate = (childLoading) => {
    setLoadingCounselList(childLoading);
  };

  useEffect(() => {
    if (loadingInfor || loadingCounselList) {
      setLoading(true);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadingInfor, loadingCounselList]);

  useEffect(() => {
    const citizensDetailContainer = document.querySelector(
      ".citizensDetail-container"
    );
    const citizensInformation = document.querySelector(".citizensInformation");
    if (loading) {
      citizensDetailContainer.style.setProperty("display", "none");
    } else {
      if (!isLargeScreen) {
        citizensDetailContainer.style.setProperty("display", "block");
      } else {
        citizensDetailContainer.style.setProperty("display", "block");
        citizensInformation.style.setProperty("display", "block");
      }
    }
  }, [loading]);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 769);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const citizensInformation = document.querySelector(".citizensInformation");
    const counselList = document.querySelector(".counselList");

    if (!loading) {
      if (isLargeScreen) {
        citizensInformation.style.setProperty("display", "block");
        counselList.style.setProperty("display", "block");
      } else {
        citizensInformation.style.setProperty("display", "none");
      }
    }
  }, [isLargeScreen]);

  useEffect(() => {
    if (location.state) {
      setButtonClicked(location.state.isButtonClicked || false);
    }
  }, [location.state]);

  return (
    <div>
      {loading && (
        <div className="loading-wrapper">
          <img src="/icons/ic_spinner.gif" alt="" />
        </div>
      )}
      <div className="citizensDetail-container">
        <HeaderComponent
          nav={navigate}
          isLogoutVisible={true}
          acitveTab={"citizens"}
        />
        <div className="components-wrapper">
          <div
            className="citizensInformation"
            style={{
              display: isButtonClicked ? "block" : "none",
            }}
          >
            <button
              className="goto-counsel"
              onClick={() => setButtonClicked(!isButtonClicked)}
            >
              <img src="/icons/ic_back.png" alt="" />
              <span> 상담리스트 </span>
            </button>
            <CitizenInfor onLoadingUpdate={handleInforLoadingUpdate} />
          </div>

          <div
            className="counselList"
            style={{
              display: isButtonClicked ? "none" : "block",
            }}
          >
            <Link to="/citizens">
              <img className="goto-back" src="/icons/ic_back.png" alt="" />
            </Link>
            <div className="citiznesCounselList">
              <CitizenCounselList
                onLoadingUpdate={handleCounselListLoadingUpdate}
              />
            </div>
            <button
              className="goto-citizensInformation"
              onClick={() => setButtonClicked(!isButtonClicked)}
            >
              <span> 상세정보 </span>{" "}
              <img src="/icons/ic_rightBtn.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizensDetails;
