import React from 'react';
import styled from 'styled-components';
import CustomInput from '../../components/customInput/CustomInput';
import LoginButton from '../../components/loginButton/LoginButton.js';
import MedicareLogo from '../../components/customInput/img_medicare_logo.svg';


const Main = () => {
  return (
    <div className="main-container">
      <div className="main-logo-container">
        <img src="/icons/ic_logo.svg" alt="logo" className="logo" />
      </div>
      <div className='main-content'>
        <h3>늘픔 약 재고 관리 서비스에 오신 것을 환영합니다</h3>
        <CustomInput placeholder="이름을 입력해주세요." icon="/icons/ic_name.svg" />
        <CustomInput placeholder="비밀번호를 입력해주세요." icon="icons/ic_password.svg" />
        <LoginButton />
      </div>
      <footer className="footer">
        <img src={MedicareLogo} alt="footer-logo" className="footer-logo" />
      </footer>
    </div>
  );
};

export default Main;
