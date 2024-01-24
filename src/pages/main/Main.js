import React from 'react';
import './Main.css';
import CustomInput from '../../components/customInput/CustomInput';
import LoginButton from '../../components/loginButton/LoginButton.js';
import NameIcon from '../../components/customInput/ic_name.svg';
import PasswordIcon from '../../components/customInput/ic_password.svg';
import NeulPeumLogo from '../../components/header/ic_logo.svg';
import MedicareLogo from '../../components/customInput/img_medicare_logo.svg';

const Main = () => {
  return (
    <div className="container">
      <div className="logo-container">
        <img src={NeulPeumLogo} alt="logo" className="logo" />
      </div>
      <h3>늘픔 약 재고 관리 서비스에 오신 것을 환영합니다</h3>
      <CustomInput placeholder="이름을 입력해주세요." icon={NameIcon} />
      <CustomInput placeholder="비밀번호를 입력해주세요." icon={PasswordIcon} />
      <LoginButton />
      <footer className="footer">
        <img src={MedicareLogo} alt="footer-logo" className="footer-logo" />
      </footer>
    </div>
  );
};

export default Main;
