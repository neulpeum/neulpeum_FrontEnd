import React from 'react';
import styled from 'styled-components';

const LeftImage = styled.div`
  width: 26px;
  height: 26px;
  background: ${(props) => `url('${props.icon}')`} no-repeat center;
  background-size: contain;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  align-items: center;
  background-color: white;
  margin-top: 48px;
  width: 282px;
`;

const RoundedInput = styled.input`
  padding: 8px;
  font-size: 12px;
  border: 0px solid black;
  width: 100%;
`;

const CustomInput = ({ placeholder, icon }) => {
  return (
    <InputContainer>
      <LeftImage icon={icon} />
      <div>
        <RoundedInput type="text" placeholder={placeholder} />
      </div>
    </InputContainer>
  );
};

export default CustomInput;
