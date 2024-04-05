import React from 'react';
import './Options.css';
import MedicareLogo from '../../components/customInput/img_medicare_logo.svg';
import MyInfoBtn from './img_my_info_btn.svg';
import CitizensBtn from './img_citizens_btn.svg';
import MedicineBtn from './img_medicine_btn.svg';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Options = () => {
    const navigate = useNavigate();

    const logout = () => {
      axios.post(
        "/logout",
        {withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "*",
          }},
      )
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/");
      })
    };

    return (
      <div className="main-container">
        <div className="logo-container">
          <img src="/icons/ic_logo.svg" alt="logo" className="logo" />
        </div>
        <div className='main-content'>
            <p>늘픔 약 재고 관리 서비스에 오신 것을 환영합니다</p>
            <div className="option-btn-container">
              <Link className="default-link-styles" to="/citizens">
                <img src={CitizensBtn} alt="citizens-btn" className="citizens-btn" />
              </Link>
              <Link className="default-link-styles" to="/drugs">
                <img src={MedicineBtn} alt="medicine-btn" className="medicine-btn" />
              </Link>
              <Link className="default-link-styles" to="/accountSettings">
                <img src={MyInfoBtn} alt="my-info-btn" className="my-info-btn" />
              </Link>
            </div>
            <p onClick={logout}>로그아웃</p>
        </div>
        <footer className="footer">
          <img src={MedicareLogo} alt="footer-logo" className="footer-logo" />
        </footer>
      </div>
    );
  };

export default Options;