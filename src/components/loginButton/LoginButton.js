import React from 'react';
import styled from 'styled-components';

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
  return (
    <LoginButtonContainer>
      <LoginButtonText>로그인</LoginButtonText>
    </LoginButtonContainer>
  );
};

export default LoginButton;
