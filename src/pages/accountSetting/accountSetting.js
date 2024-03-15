import React, { useState } from "react";
import styled from 'styled-components';
import HeaderComponent from '../../components/header/Header';
import axios from "axios";
// "http://52.78.35.193:8080/api/admin" : 관리자 계정 비밀번호 변경 Method: PATCH
// `http://52.78.35.193:8080/api/admin/${changePw}` : 대학생 계정 비밀번호 변경 Method: PATCH
const AccountContainer = styled.div`
    width: 81.3%;
    height: fit-content;
    margin: 0 auto;
`;

const SwitchButtonContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
`;

const AccountInputContainer = styled.div`
    width: 100%;
    height: fit-content;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    padding: 2em;
`;
const AccountSpan = styled.span`
    font-size: 28px;
    font-weight: bold;
    white-space: nowrap;
`;
const AccountInput= styled.input`
    height: fit-content;
    width: 348px;
    text-align: left;
    padding-left: 16px;
    padding-top: 1em;
    padding-bottom: 1em;
    line-height: 1.5em;
    font-size: 28px;
    cursor: pointer;
`;
const AccountButton = styled.button`
    background-color: #aed391;
    border: none;
    color: white;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    padding: 1rem 2.8rem;
`;
const TabButton = styled.button`
    flex: 1;
    border: 0.5px solid black;
    padding: 1.38rem 0;
    border-radius: 2rem 2rem 0 0;
    color: black;
    font-weight: bold;
    font-size: 32px;
    cursor: pointer;
`;
const PickIcon = styled.img`
    vertical-align: top;
    margin-right: 15px;
    width: 24px;
    height: 24px;
`
// const [originalPw, setOriginalPw] = useState(""); // 현재 비밀번호 입력
    // const [newPw, setNewPw] = useState(""); //새 비밀번호 입력
    // const [checkPw, setCheckPw] = useState(""); //새 비밀번호 확인

const AccountSetting = () => {
    const [activeTab, setActiveTab] = useState(0);

    const CreateInputContainer = () => {
        return (
        <AccountInputContainer >
            <AccountSpan>
                {(activeTab) ? '관리자 비밀번호 변경하기' : '대학생 비밀번호 변경하기'}
            </AccountSpan>
            <AccountInput 
            type='text' 
            id='currentPw'
            name='currentPw'
            placeholder='현재 비밀번호 입력' 
            defaultValue=""
            />
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <AccountInput 
                type='text' 
                id="newPw"
                name="newPw"
                placeholder='새 비밀번호 입력' 
                defaultValue=""
                />
                <AccountInput 
                type="text"
                id="checkPw"
                name="checkPw"
                placeholder='새 비밀번호 확인' 
                defaultValue=""
                />
            </div>
            <AccountButton onClick={() => {}}>
                비밀번호 변경
            </AccountButton>
        </AccountInputContainer>
        )
    }
    const TabButtons = [
        {name: '관리자 비밀번호 변경', content: <CreateInputContainer/>},
        {name: '대학생 비밀번호 변경', content: <CreateInputContainer/>},
    ];

    return (
        <>
            <HeaderComponent/>
            <AccountContainer>
                <SwitchButtonContainer>
                    {TabButtons.map((tab, index) => (
                        <TabButton
                        key={index}
                        onClick={() => setActiveTab(index)}
                        style={(activeTab === index) ? { backgroundColor: '#aed391' } : { backgroundColor: '#FFF' }}
                        >
                        <PickIcon 
                        src="/icons/ic_selected.svg" 
                        style={(activeTab === index) ? { visibility: 'visible' } : { visibility: 'hidden' }}
                        />
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