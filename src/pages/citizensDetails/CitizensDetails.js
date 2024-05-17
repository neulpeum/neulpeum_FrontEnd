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

  // const dpr = window.devicePixelRatio || 1;
  // const [mediaQuery1280, setMediaQuery1280] = useState();
  // const [mediaQuery1920, setMediaQuery1920] = useState();
  // const [mediaQuery2560, setMediaQuery2560] = useState();
  // const [mediaQuery3840, setMediaQuery3840] = useState();

  const handleInforLoadingUpdate = (childLoading) => {
    setLoadingInfor(childLoading);
  };

  const handleCounselListLoadingUpdate = (childLoading) => {
    setLoadingCounselList(childLoading);
  };

  // useEffect(() => {
  //   function getMaxMediaQuery(maxWidth, dpr) {
  //     const cssWidth = maxWidth * dpr;
  //     return `@media (max-width: ${cssWidth}px)`;
  //   }

  //   function getBtMediaQuery(minWidth, maxWidth, dpr) {
  //     const cssMinWidth = minWidth * dpr + 1;
  //     const cssMaxWidth = maxWidth * dpr;
  //     return `@media (min-width: ${cssMinWidth}px) and (max-width: ${cssMaxWidth}px)`;
  //   }

  //   function getMinMediaQuery(minWidth, dpr) {
  //     const cssWidth = minWidth * dpr + 1;
  //     return `@media (min-width: ${cssWidth}px)`;
  //   }

  //   setMediaQuery1280(getMaxMediaQuery(1280, dpr));
  //   setMediaQuery1920(getBtMediaQuery(1280, 1920, dpr));
  //   setMediaQuery2560(getBtMediaQuery(1920, 2560, dpr));
  //   setMediaQuery3840(getMinMediaQuery(2560, dpr));
  // }, [dpr]);

  // useEffect(() => {
  //   if (loadingInfor || loadingCounselList || !mediaQuery1280) {
  //     setLoading(true);
  //   } else {
  //     const timer = setTimeout(() => {
  //       setLoading(false);
  //     }, 500);
  //     return () => clearTimeout(timer);
  //   }
  // }, [loadingInfor, loadingCounselList]);

  // useEffect(() => {
  //   const citizensInformation = document.querySelector(".citizensInformation");
  //   const counselList = document.querySelector(".counselList");
  //   if (loading) {
  //     citizensInformation.style.setProperty("display", "none");
  //     counselList.style.setProperty("display", "none");
  //   } else {
  //     if (!isLargeScreen) {
  //       counselList.style.setProperty("display", "block");
  //     } else {
  //       citizensInformation.style.setProperty("display", "block");
  //       counselList.style.setProperty("display", "block");
  //     }
  //   }
  // }, [loading]);

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
    const citizensInformation = document.querySelector(".citizensInformation");
    const counselList = document.querySelector(".counselList");
    if (loading) {
      citizensInformation.style.setProperty("display", "none");
      counselList.style.setProperty("display", "none");
    } else {
      if (!isLargeScreen) {
        counselList.style.setProperty("display", "block");
      } else {
        citizensInformation.style.setProperty("display", "block");
        counselList.style.setProperty("display", "block");
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
      {" "}
      {/* <style>
                    {`
                      ${mediaQuery1280} { html { font-size: 12px; } }
                       ${mediaQuery1920} { html { font-size: 19px; } }
                       ${mediaQuery2560} { html { font-size: 26px; } }
                       ${mediaQuery3840} { html { font-size: 38px; } }
                       `}
                  </style> */}{" "}
      <HeaderComponent
        nav={navigate}
        isLogoutVisible={true}
        acitveTab={"citizens"}
      />{" "}
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
            <span> 상담리스트 </span>{" "}
          </button>{" "}
          <CitizenInfor onLoadingUpdate={handleInforLoadingUpdate} />{" "}
        </div>{" "}
        {loading && (
          <div className="loading-wrapper">
            <img src="/icons/ic_spinner2.gif" alt="" />
          </div>
        )}{" "}
        <div
          className="counselList"
          style={{
            display: isButtonClicked ? "none" : "block",
          }}
        >
          <Link to="/citizens">
            <img className="goto-back" src="/icons/ic_back.png" alt="" />
          </Link>{" "}
          <div className="citiznesCounselList">
            <CitizenCounselList
              onLoadingUpdate={handleCounselListLoadingUpdate}
            />{" "}
          </div>{" "}
          <button
            className="goto-citizensInformation"
            onClick={() => setButtonClicked(!isButtonClicked)}
          >
            <span> 상세정보 </span> <img src="/icons/ic_rightBtn.svg" alt="" />
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default CitizensDetails;
