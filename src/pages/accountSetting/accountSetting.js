import React, { useState } from "react";
import styled from 'styled-components';
import HeaderComponent from '../../components/header/Header';

const AccountContainer = styled.div`
    width: 1172px;
    height: 587px;
    flex-direction: column;
    align-items: center;
`;

const SwitchButtonContainer = styled.div`
    height: 100px;
    width: 100%;
    min-width: 640px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const AccountInputWrapper = styled.div`
    border: 1px solid black;
    height: 487px;
    width: 100%;
    min-width: 640px;
`;
const AccountInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 39px;
`;
const AccountSpan = styled.span`
    font-size: 24px;
    font-weight: bold;
    white-space: nowrap;
    margin-top: 68px;
`;
const AccountInput= styled.input`
    width: 348px;
    height: 69px;
    text-align: left;
    padding-left: 16px;
    font-size: 20px;
`;
const AccountButton = styled.button`
    width: 189px;
    height: 56px;
    margin-bottom: 44px;
    padding: 1rem 2rem;
    background-color: #aed391;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
`;
const TabButton = styled.button`
    flex: 1;
    text-align: center;
    padding: 2rem 3rem;
    border: 0.5px solid black;
    border-radius: 2rem 2rem 0 0;
    background-color: ${(props) => (props.active ? '#aed391' : '#FFF')};
    color: balck;
    font-weight: bold;
    white-space: nowrap;
    font-size: 24px;
    cursor: pointer;
`;

const CreateCurrentTab = ({currentTab}) => {
    const TabConfig = {
        Admin: {
            content: (
                <AccountInputWrapper>
                    <AccountInputContainer>
                        <AccountSpan>관리자 계정 변경</AccountSpan>
                        <AccountInput 
                        type='text' 
                        placeholder='새 아이디 입력' 
                        id="idForAdmin"/>
                        <AccountInput 
                        type='text' 
                        placeholder='새 비밀번호 입력' 
                        id="passwordForAdmin"/>
                        <AccountButton>계정 변경</AccountButton>
                    </AccountInputContainer>
                </AccountInputWrapper>
            )
        },
        Student: {
            content: (
                <AccountInputWrapper>
                    <AccountInputContainer>
                        <AccountSpan>대학생 비밀번호 변경</AccountSpan>
                        <AccountInput 
                        type='text' 
                        placeholder='새 비밀번호 입력' 
                        id="idForStudent" 
                        required />
                        <AccountInput 
                        type='text' 
                        placeholder='새 비밀번호 확인' 
                        id="passwordForStudent" 
                        required/>
                        <AccountButton>비밀번호 변경</AccountButton>
                    </AccountInputContainer>
                </AccountInputWrapper>
            )
        },
    }
    const currentTabConfig = TabConfig[currentTab];

    return (
        <>{currentTabConfig.content}</>
    );
};

const AccountSetting = () => {

    const [forWho, setForWho] = useState('Admin');

    const handleButtonClick = (buttonName) => {
        setForWho(buttonName);
    };
    
    const ButtonGroup = ({ onButtonClick }) => {
        return (
          <SwitchButtonContainer>
            <TabButton
              onClick={() => onButtonClick('Admin')}
              active={forWho === 'Admin' ? 1 : 0}
            >
              관리자 계정 변경
            </TabButton>
            <TabButton
              onClick={() => onButtonClick('Student')}
              active={forWho === 'Student' ? 1 : 0}
            >
              대학생 비밀번호 변경
            </TabButton>
          </SwitchButtonContainer>
        );
    };
    
    return (
        <div>
            <HeaderComponent/>
            <div className='account-wrapper'>
                <AccountContainer>
                    <ButtonGroup onButtonClick={handleButtonClick} />
                    <CreateCurrentTab currentTab={forWho}/>
                </AccountContainer>
            </div>
        </div>
    );
};

export default AccountSetting;