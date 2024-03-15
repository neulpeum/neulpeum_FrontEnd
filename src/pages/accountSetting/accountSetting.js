import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import HeaderComponent from '../../components/header/Header';
import axios from "axios";
// "http://52.78.35.193:8080/api/admin" : 관리자 계정 비밀번호 변경 Method: PATCH
// `http://52.78.35.193:8080/api/admin/${changePw}` : 대학생 계정 비밀번호 변경 Method: PATCH
// url parameter ( query string )
// useEffect(() => {
//     const fetchDrugs = async () => {
//         if (!originalDrugs) {
//             try {
//                 const response = await axios.get("http://52.78.35.193:8080/api/drug");
//                 setOriginalDrugs(response.data);
//                 setCurrentDrugsData(response.data); //좀있다 지울것
//             } catch (e) {
//                 console.log('서버에서 데이터를 GET 하는 중 알 수 없는 에러를 감지했습니다.');
//             }
//         }
//     }
//     fetchDrugs();
// }, []); 
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
    color: black;
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
`;
const PickIcon = styled.img`
    vertical-align: top;
    margin-right: 15px;
    width: 24px;
    height: 24px;
`
        // const handleSubmit = () => {
        //     const addCitizen = async () => {
        //       if (name === "" || address === "" || medicalHistory ==="" || notes === "") {
        //         return alert('모든 항목을 입력해주세요');
        //       }
        //       try {
        //         setError(null);
        //         const data = {
        //           patientName: name,
        //           address: address,
        //           disease: medicalHistory,
        //           speicalReport: notes,
        //         };
                
        //         await axios.post("http://52.78.35.193:8080/api/patient", data);
        //         alert('주민이 추가되었습니다');
        //         navigateToCitizens();
        //       } catch (e) {
        //         setError(e);
        //       }
        //     };
        //     addCitizen();
        //   };
const AccountContent = () => {
    const [originalPw, setOriginalPw] = useState(""); // 현재 비밀번호 입력
    const [newPw, setNewPw] = useState(""); //새 비밀번호 입력
    const [checkPw, setCheckPw] = useState(""); //새 비밀번호 확인
    const [activeTab, setActiveTab] = useState(0);
    const TabButtons = [
        {button: '관리자 비밀번호 변경', content: <CreateInputContainer currentState={'Admin'}/>},
        {button: '대학생 비밀번호 변경', content: <CreateInputContainer currentState={'Student'}/>},
    ];

    const ChangeState = () => {
        setOriginalPw("");
        setNewPw("");
        setCheckPw("");
    }
    const CreateInputContainer = ({currentState}) => {
        const handleSubmitAdminPw = async () => {
            if (originalPw === "" || newPw === "" || checkPw ==="")  {
                return alert('모든 항목을 입력해주세요');
            }
            try {
                await axios.patch("http://52.78.35.193:8080/api/admin");
            } catch (error) {
                console.log(error);
            }
        }
        const handleSubmitStudnetPw = async (e) => {
            if (originalPw === "" || newPw === "" || checkPw ==="")  {
                return alert('모든 항목을 입력해주세요');
            }
            try {
                await axios.patch(`http://52.78.35.193:8080/api/admin/${newPw}`);
            } catch (error) {
                console.log(error);
            }
        }
        return (
            <AccountInputContainer >
                <AccountSpan>
                    {(currentState === 'Admin') ? '관리자 비밀번호 변경하기' : '대학생 비밀번호 변경하기'}
                </AccountSpan>
                <AccountInput 
                type='text' 
                placeholder='현재 비밀번호 입력' 
                value={originalPw}
                onChange={(event) => setOriginalPw(event.target.value)}
                id='1'
                />
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <AccountInput 
                    type='text' 
                    placeholder='새 비밀번호 입력' 
                    value={newPw}
                    onChange={(event) => setNewPw(event.target.value)}
                    id="2"
                    />
                    <AccountInput 
                    type='text' 
                    placeholder='새 비밀번호 확인' 
                    value={checkPw}
                    onChange={(event) => setCheckPw(event.target.value)}
                    id="3"
                    />
                </div>
                <AccountButton onClick={currentState==='Admin' ? handleSubmitAdminPw : handleSubmitStudnetPw}>
                    계정 변경
                </AccountButton>
            </AccountInputContainer>
        )
    }
    
    const CreateAccountContent = {
        content: (
        <AccountContainer>
            <SwitchButtonContainer>
                {TabButtons.map((tab, index) => (
                    <TabButton
                    key={index}
                    onClick={() => setActiveTab(index)}
                    style={(activeTab === index) ? { backgroundColor: '#aed391' } : { backgroundColor: '#FFF' }}>
                    <PickIcon 
                    src="/icons/ic_selected.svg" 
                    style={(activeTab === index) ? { visibility: 'visible' } : { visibility: 'hidden' }}
                    />
                    {tab.button}
                    </TabButton>
                ))}
            </SwitchButtonContainer>
            {TabButtons[activeTab].content}
        </AccountContainer>
        ),
    };
    const currentContent = CreateAccountContent;

    return <>{currentContent.content}</>
}

const AccountSetting = () => {
    
    return (
        <>
            <HeaderComponent/>
            <AccountContent />
        </>
    );
};

export default AccountSetting;