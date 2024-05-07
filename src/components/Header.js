import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import 'styles/ForComps/Header.css';

const createHeader = ({nav, isLogoutVisible}) => {
  const isMobile = window.innerWidth <= 768
  const dest = isMobile ? "/citizens" : "/options"; 
  // 데스크탑버전시 시민페이지로 모바일 버전시 옵션으로 돌아가는데 이번에 옵션페이지가 없어진다면 그다음에 어디로 연결할지 토론
  const visible = isLogoutVisible;

  const navigate = nav;
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

  const mainView = 
    (isMobile) ? 
      <div className="header-container">
        <Link to={dest}>
          <img src="/icons/ic_logo.svg" alt="home-button" className="logo"/>
        </Link>
        {visible && (
          <div onClick={logout} className='logout-container'>
            <img src='/icons/ic_logout.svg' alt='logout' className='logout'/>
          </div>
        )}
      </div> 
    : 
    <div className='my-header-container'>
        <Link className='home-button' to={dest}>
          <img src="/icons/ic_logo.svg" alt="home-button" className="logo"/>
        </Link>
      <div className='subMenu-container'>
        <Link to={'/drugs'}>약 재고화면</Link>
        <Link to={'/citizens'}>주민 화면</Link>
        <Link to={'/accountSettings'}>개인정보 수정 화면</Link>
      </div>
      {visible && (
      <div onClick={logout} className='logout-container'>
        <img src='/icons/ic_logout.svg' alt='logout' className='logout'/>
      </div>
    )}
    </div>

  return(
      <>{mainView}</>
  )
}

export default createHeader;