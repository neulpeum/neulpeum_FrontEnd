import React, { useState, useEffect } from "react";
import CitizenInfor from "../../components/citizenInfor/CitizenInfor";
import CitizenCounselList from "../../components/citizenCounselList/CitizenCounselList";

const CitizensDetails = () => {
  const [isButtonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  const [isLargeScreen, setIsLargeScreen] = useState(false);

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
      counselList.style.setProperty("display", "none");
    }
  }, [isLargeScreen]);

  return (
    <div className="components-wrapper">
      <div
        className="citizensInformation"
        style={{
          display: isButtonClicked ? "none" : "block",
        }}
      >
        <button className="goto-citizens">&lt; 주민 목록</button>
        <CitizenInfor />
        <button
          className="goto-counsel"
          onClick={() => setButtonClicked(!isButtonClicked)}
        >
          상담리스트 &gt;
        </button>
      </div>
      <div
        className="counselList"
        style={{
          display: isButtonClicked ? "block" : "none",
        }}
      >
        <button
          className="goto-citizensInformation"
          onClick={() => setButtonClicked(!isButtonClicked)}
        >
          &lt;
        </button>
        <CitizenCounselList />
      </div>
    </div>
  );
};

export default CitizensDetails;
