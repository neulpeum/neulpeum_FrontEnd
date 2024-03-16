import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CustomInput from '../../components/customInput/CustomInput';
import LoginButton from '../../components/loginButton/LoginButton.js';
import MedicareLogo from '../../components/customInput/img_medicare_logo.svg';
import axios from "axios";


const Main = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  
  const login = async () => {
    const loginRequest = {
      "username" : id,
      "password" : password,
    }
    axios
    .post("http://52.78.35.193:8080/api/login", loginRequest)
    .then((res) => {
      console.log(res.headers); // 쿠키 못가져옴
      const isMobile = window.innerWidth <= 768
      const destination = isMobile ? "/citizens" : "/options";
      navigate(destination);
    })
    .catch((error) => {
      alert("아이디나 비밀번호가 일치하지 않습니다. 다시 시도해주세요.")
    });
  };

  return (
    <div className="main-container">
      <div className="main-logo-container">
        <img src="/icons/ic_logo.svg" alt="logo" className="logo" />
      </div>
      <div className='main-content'>
        <h3>늘픔 약 재고 관리 서비스에 오신 것을 환영합니다</h3>
        <CustomInput inputValue={id} onChange={(event) => setId(event.target.value)} placeholder="이름을 입력해주세요." icon="/icons/ic_name.svg" isPassword={false}/>
        <CustomInput inputValue={password} onChange={(event) => setPassword(event.target.value)} placeholder="비밀번호를 입력해주세요." icon="icons/ic_password.svg" isPassword={true} />
        <LoginButton onLoginClick={login}/>
      </div>
      <footer className="footer">
        <img src={MedicareLogo} alt="footer-logo" className="footer-logo" />
      </footer>
    </div>
  );
};

export default Main;
