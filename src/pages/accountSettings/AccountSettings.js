import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "components/Header";
import AccountChangeForm from "./AccountChangeForm";
import "styles/ForPages/AccountSettings/AccountSettings.css";

const AccountSetting = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true); // 로딩 상태 시작
    axios
      .get("/api/drug")
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const TabButtons = [
    {
      name: "관리자 비밀번호 변경",
      content: <AccountChangeForm key="admin" userType={"admin"} />,
    },
    {
      name: "대학생 비밀번호 변경",
      content: <AccountChangeForm key="user" userType={"user"} />,
    },
  ];

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  if (loading)
    return (
      <div className="loading-wrapper">
        <img src="/icons/ic_spinner.gif" alt="" />
      </div>
    );
  if (error) {
    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      error.response.status === 400
    ) {
      alert("접근 권한이 없습니다");
      navigate(-1);
      return;
    }
  }

  return (
    <>
      <HeaderComponent
        nav={navigate}
        isLogoutVisible={true}
        acitveTab={"account"}
      />
      <div className="account-wrapper">
        <div className="account-switchBtns-container">
          {TabButtons.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              style={
                activeTab === index
                  ? { backgroundColor: "#aed391", borderColor: "#aed391" }
                  : { backgroundColor: "#D9D9D9" }
              }
            >
              {activeTab === index && (
                <img
                  className="pickIcon"
                  src="/icons/ic_selected.svg"
                  alt="pickIcon"
                />
              )}
              {tab.name}
            </button>
          ))}
        </div>
        {TabButtons[activeTab].content}
      </div>
    </>
  );
};

export default AccountSetting;
