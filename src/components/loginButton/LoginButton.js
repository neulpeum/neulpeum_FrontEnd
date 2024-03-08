import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const LoginButtonContainer = styled.button`
  width: 141px;
  height: 51px;
  border: none;
  border-radius: 20px;
  background-color: #AED391;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 46px;
`;

const LoginButtonText = styled.span`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

const LoginButton = () => {
  const isMobile = window.innerWidth <= 768
  var destination = isMobile ? "/citizens" : "/options";
  
  return (
    <LoginButtonContainer>
      <Link className="default-link-styles" to={destination}>
        <LoginButtonText>로그인</LoginButtonText>
      </Link>
    </LoginButtonContainer>
  );
};

export default LoginButton;
