import React from 'react';
import styled from 'styled-components';

const LeftImage = styled.div`
  width: 26px;
  height: 26px;
  background: ${(props) => `url(${props.$icon})`} no-repeat center;
  background-size: contain;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 8px;
  display: flex;
  align-items: center;
  background-color: white;
  margin-top: 48px;
  width: 491px;
  height: 71px;

  @media (max-width: 768px) {
    width: 282px;
    height: auto;
  }
`;

const RoundedInput = styled.input`
  padding: 8px;
  font-size: 15px;
  border: 0px solid black;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const CustomInput = ({value, onChange, placeholder, icon, isPassword, onKeyDown}) => {
  const inputType = isPassword ? 'password' : 'text';
  return (
    <InputContainer>
      <LeftImage $icon={icon} />
      <div>
        <RoundedInput 
        value={value} 
        onChange={onChange} 
        type={inputType} 
        placeholder={placeholder} 
        onKeyDown={(e) => onKeyDown(e)} 
        autoComplete='off'
        />
      </div>
    </InputContainer>
  );
};

export default CustomInput;
