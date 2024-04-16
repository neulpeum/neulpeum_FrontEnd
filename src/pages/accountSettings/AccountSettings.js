import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import styled from 'styled-components';
import HeaderComponent from "components/Header";
import AccountChangeForm from './AccountChangeForm';

const AccountContainer = styled.div`
    width: 70%;
    height: fit-content;
    margin: 50px auto;
`;

const SwitchButtonContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
`;

const TabButton = styled.button`
    flex: 1;
    border: 0.5px solid black;
    padding: 1.38rem 0;
    border-radius: 2rem 2rem 0 0;
    color: black;
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;
`;
const PickIcon = styled.img`
    vertical-align: top;
    margin-right: 15px;
    width: 32px;
    height: 32px;
`
const AccountSetting = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
          axios.get("/api/drug").then((response) => {}).catch((error) => setError(error));
    }, []);

    const TabButtons = [
        {name: '관리자 비밀번호 변경', content: <AccountChangeForm key='admin' userType={'admin'} />},
        {name: '대학생 비밀번호 변경', content: <AccountChangeForm key='user' userType={'user'}/>},
    ];

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    if (error) {
        if (error.response.status === 401 || error.response.status === 403 || error.response.status === 400) {
          alert("접근 권한이 없습니다");
          navigate(-1);
          return;
        }
      }

    return (
        <>
            <HeaderComponent nav = {navigate} isLogoutVisible = {true}/>
            <AccountContainer>
                <SwitchButtonContainer>
                    {TabButtons.map((tab, index) => (
                        <TabButton key={index} onClick={() => handleTabClick(index)} style={(activeTab === index) ? { backgroundColor: '#aed391' } : { backgroundColor: '#FFF' }}>
                            {(activeTab === index) && <PickIcon src="/icons/ic_selected.svg"/>}
                            {tab.name}
                        </TabButton>
                    ))}
                </SwitchButtonContainer>
                {TabButtons[activeTab].content}
            </AccountContainer>
        </>
    );
};

export default AccountSetting;