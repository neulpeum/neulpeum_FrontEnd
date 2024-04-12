import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import CustomInput from './CustomInput';
import LoginButton from './LoginButton';
import LoginWrapper from 'components/LoginWrapper';
import 'styles/ForPages/Main/Main.css';


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
    .post("/api/login", loginRequest, { withCredentials: true })
    .then((res) => {
      const isMobile = window.innerWidth <= 768;
      const destination = isMobile ? "/citizens" : "/options";
      navigate(destination);
    })
    .catch((error) => {
      alert("아이디나 비밀번호가 일치하지 않습니다. 다시 시도해주세요.")
    });
  };

  const activeEnter = (e) => {
    if(e.key === "Enter") {
      login();
    }
  }
 
  const LoginView = 
  <>
    <div className="main-logo-container">
          <img src="/icons/ic_logo.svg" alt="logo" className="logo" />
        </div>
    <div className='main-content'>
      <p>늘픔 약 재고 관리 서비스에 오신 것을 환영합니다</p>
      <CustomInput inputValue={id} onChange={(event) => setId(event.target.value)} placeholder="이름을 입력해주세요." icon="/icons/ic_name.svg" isPassword={false} onKeyDown={(e) => activeEnter(e)}/>
      <CustomInput inputValue={password} onChange={(event) => setPassword(event.target.value)} placeholder="비밀번호를 입력해주세요." icon="/icons/ic_password.svg" isPassword={true} onKeyDown={(e) => activeEnter(e)} />
      <LoginButton onLoginClick={login}/>
    </div>
  </>
  return (
    <LoginWrapper content={LoginView} />
  );
};

export default Main;
