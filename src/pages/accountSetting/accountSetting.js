import React, { useState } from "react";
import table from "react-table";
import styled from 'styled-components';
import HeaderComponent from '../../components/header/Header';
import axios from "axios";

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
    font-size: 20px;
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
    font-size: 20px;
`;
const AccountButton = styled.button`
    background-color: #aed391;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    padding: 1rem 2.8rem;
`;
const TabButton = styled.button`
    flex: 1;
    border: 0.5px solid black;
    padding: 1.38rem 0;
    border-radius: 2rem 2rem 0 0;
    background-color: ${({ isActive }) => (isActive ? '#aed391' : '#FFF')};
    color: black;
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
`;
const PickIcon = styled.img`
    visibility: ${({isActive}) => isActive ?  'visible' : 'hidden'};
    vertical-align: top;
    margin-right: 15px;
    width: 24px;
    height: 24px;
`
const AccountContent = () => {
    const CreateInputContainer = ({currentState}) => {
        return (
            <AccountInputContainer >
                <AccountSpan>
                    {(currentState === 'Admin') ? '관리자 비밀번호 변경하기' : '대학생 비밀번호 변경하기'}
                </AccountSpan>
                <AccountInput 
                type='text' 
                placeholder='현재 비밀번호 입력' 
                id="idForAdmin"
                />
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <AccountInput 
                    type='password' 
                    placeholder='새 비밀번호 입력' 
                    id="passwordForAdmin"/>
                    <AccountInput 
                    type='password' 
                    placeholder='새 비밀번호 확인' 
                    id="passwordForAdminCheck"
                    />
                </div>
                <AccountButton onClick={() => {}}>계정 변경</AccountButton>
            </AccountInputContainer>
        )
    }

    const [activeTab, setActiveTab] = useState(0);
    const TabButtons = [
        {button: '관리자 비밀번호 변경', content: <CreateInputContainer />},
        {button: '대학생 비밀번호 변경', content: <CreateInputContainer />},
    ];
    
    const CreateAccountContent = {
        content: (
        <AccountContainer>
            <SwitchButtonContainer>
                {TabButtons.map((tab, index) => (
                    <TabButton
                    key={index}
                    isActive={activeTab === index}
                    onClick={() => setActiveTab(index)}>
                    
                    <PickIcon src="/icons/ic_selected.svg" isActive={activeTab === index}/>{tab.button}
                    </TabButton>
                ))}
            </SwitchButtonContainer>
            {TabButtons[activeTab].content}
        </AccountContainer>
        ),
        config : {

        }
    };
    const currentContent = CreateAccountContent;

    return <>{currentContent.content}</>
}

const AccountSetting = () => {
    //const [forWho, setForWho] = useState('Admin');

    let currentAdminPass, currentStudentPass = []
    //axios.get('/api/patient/consult?patientId=1')
    // 이걸 API 통신을 통해 프레임일때 가져와야됨 Method.Get
    const [newAdminPass, setNewAdminPass] = useState(''); //새로운 어드민비밀번호
    const [newStudentPass, setNewStudentPass] = useState(''); //새로운 학생비밀번호
    
    return (
        <>
            <HeaderComponent/>
            <AccountContent />
        </>
    );
};

export default AccountSetting;