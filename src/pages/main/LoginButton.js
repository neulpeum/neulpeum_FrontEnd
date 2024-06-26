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

const LoginLink = styled(Link)`
  text-decoration: none;
`;

const LoginButtonText = styled.span`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

const LoginButton = (props) => {
  return (
    <LoginButtonContainer>
      <LoginLink className="default-link-styles">
        <LoginButtonText onClick={props.onLoginClick}>로그인</LoginButtonText>
      </LoginLink>
    </LoginButtonContainer>
  );
};

export default LoginButton;
