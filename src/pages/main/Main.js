import React from 'react';
import styled from 'styled-components';
import CustomInput from '../../components/customInput/CustomInput';
import LoginButton from '../../components/loginButton/LoginButton.js';
import MedicareLogo from '../../components/customInput/img_medicare_logo.svg';
import backgroundImg from './img_main_background.svg';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  height: 100vh;
  min-height: 100%;
`;

const Main = () => {
  return (
    <MainContainer className="container">
      <div className="logo-container">
        <img src="/icons/ic_logo.svg" alt="logo" className="logo" />
      </div>
      <h3>늘픔 약 재고 관리 서비스에 오신 것을 환영합니다</h3>
      <CustomInput placeholder="이름을 입력해주세요." icon="/icons/ic_name.svg" />
      <CustomInput placeholder="비밀번호를 입력해주세요." icon="icons/ic_password.svg" />
      <LoginButton />
      <footer className="footer">
        <img src={MedicareLogo} alt="footer-logo" className="footer-logo" />
      </footer>
    </MainContainer>
  );
};

export default Main;
