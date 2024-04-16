import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "components/Header";
import CitizenInfor from "./CitizenInfor";
import CitizenCounselList from "./CitizenCounselList";
import "styles/ForPages/CitizensDetails/CitizensDetails.css";

const CitizensDetails = () => {
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 769);
  };

  useEffect(() => {
    // 초기화
    handleResize();

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // isLargeScreen 상태가 변경될 때마다 실행되는 코드
    const citizensInformation = document.querySelector(".citizensInformation");
    const counselList = document.querySelector(".counselList");
    if (isLargeScreen) {
      citizensInformation.style.setProperty("display", "block");
      counselList.style.setProperty("display", "block");
    } else {
      citizensInformation.style.setProperty("display", "none");
    }
  }, [isLargeScreen]);

  useEffect(() => {
    if (location.state) {
      setButtonClicked(location.state.isButtonClicked || false);
    }
  }, [location.state]);

  return (
    <div>
      <HeaderComponent nav={navigate} isLogoutVisible={true} />

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
            &lt;
          </button>
          <CitizenInfor />
        </div>
        <div
          className="counselList"
          style={{
            display: isButtonClicked ? "none" : "block",
          }}
        >
          <Link className="link-styles" to="/citizens">
            <button className="goto-citizens">&lt;</button>
          </Link>
          <div className="citiznesCounselList">
            <CitizenCounselList />
          </div>
          <button
            className="goto-citizensInformation"
            onClick={() => setButtonClicked(!isButtonClicked)}
          >
            상세 정보 &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitizensDetails;
