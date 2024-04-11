import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import CustomInput from './CustomInput';
import LoginButton from './LoginButton';


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

  return (
    <>
      <CustomInput inputValue={id} onChange={(event) => setId(event.target.value)} placeholder="이름을 입력해주세요." icon="/icons/ic_name.svg" isPassword={false} onKeyDown={(e) => activeEnter(e)}/>
      <CustomInput inputValue={password} onChange={(event) => setPassword(event.target.value)} placeholder="비밀번호를 입력해주세요." icon="/icons/ic_password.svg" isPassword={true} onKeyDown={(e) => activeEnter(e)} />
      <LoginButton onLoginClick={login}/>
    </>
  );
};

export default Main;
