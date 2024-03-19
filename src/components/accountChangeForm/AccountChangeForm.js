import React,{ useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AccountContent = styled.div` 
    width: 100%;
    height: fit-content;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    padding: 2em 0;
`;
const AccountSpan = styled.span`
    font-size: 28px;
    font-weight: bold;
    white-space: nowrap;
`;
const AccountInput= styled.input`
    height: fit-content;
    width: 383px;
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
const GuideMsg = styled.div`
    color: blue;
    font-size: 18px;
`
const WarningMsg = styled.div`
    color: red;
    font-size: 18px;
`
const ToggleButton = styled.button`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
`;
const EyeIcon = styled.img`
    width: 24px;
    height: 24px;
`;

export default function AccountChangeForm({userType}) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordsVisible, setPasswordsVisible] = useState([false, false, false]); //나중에 false로 변경할것

    const [error, setError] = useState(null);

    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    let specialStr = '※';

    const togglePasswordVisibility = (index) => {
        const newPasswordsVisible = [...passwordsVisible];
        newPasswordsVisible[index] = !newPasswordsVisible[index];
        setPasswordsVisible(newPasswordsVisible);
    };

    const handleSumbit = async () => {
        if (!passwordRegex.test(newPassword)) return(alert('비밀번호는 알파벳 숫자 조합 6자리 이상이어야 합니다.'));
    
        const body = {
            currentPassword : currentPassword,
            newPassword : newPassword,
        };
    
        let url;
        if (userType === 'admin') {
            url = "http://52.78.35.193:8080/api/admin";
        } else if (userType === 'user') {
            url = "http://52.78.35.193:8080/api/admin/changePw";
        }
    
        axios.patch(url, body)
        .then((res) => {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        })
        .catch((error) => {
            if (error.code === "ERR_BAD_RESPONSE") {
                setCurrentPassword('');
                setError(error);
            } else {
                console.error(error); // 예상치 못한 에러 발생시
            }
        });
    }

    return (
        <AccountContent>
            <AccountSpan>{(userType === 'admin') ? '관리자 비밀번호 변경하기' : '대학생 비밀번호 변경하기'}</AccountSpan>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className='account-input-container'>
                    <AccountInput 
                    type={passwordsVisible[0] ? 'text' : 'password'}
                    id='current_password'
                    value={currentPassword} 
                    placeholder='현재 비밀번호 입력'
                    onChange={(e) => setCurrentPassword(e.target.value)}/>
                    {/* <ToggleButton onClick={() => togglePasswordVisibility(0)}>
                        <EyeIcon src={passwordsVisible[0] ? "보이게 할시이미지 경로주소" : "안보이게 할시 이미지 경로주소"} alt="Toggle password visibility" />
                    </ToggleButton> */}
                </div>
                {(error) && <WarningMsg>{specialStr} 비밀번호를 잘못 입력하셨습니다.</WarningMsg>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <div className='account-input-container' >
                <AccountInput 
                type={passwordsVisible[1] ? 'text' : 'password'}
                id='new_password'
                value={newPassword} 
                placeholder='새 비밀번호 입력'
                onChange={(e) => setNewPassword(e.target.value)}/>
                {/* <ToggleButton onClick={() => togglePasswordVisibility(1)}>
                    <EyeIcon src={passwordsVisible[1] ? "보이게 할시이미지 경로주소" : "안보이게 할시 이미지 경로주소"} alt="Toggle password visibility" />
                </ToggleButton> */}
                </div>
                <div className='account-input-container'>
                <AccountInput 
                type={passwordsVisible[2] ? 'text' : 'password'}
                id='confirm_new_password'
                value={confirmNewPassword} 
                placeholder='새 비밀번호 확인'
                onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                {/* <ToggleButton onClick={() => togglePasswordVisibility(2)}>
                    <EyeIcon src={passwordsVisible[2] ? "보이게 할시이미지 경로주소" : "안보이게 할시 이미지 경로주소"} alt="Toggle password visibility" />
                </ToggleButton> */}
                </div>
                {<GuideMsg>{specialStr} 알파벳 숫자 조합 6자리 이상</GuideMsg>}
                {(newPassword !== confirmNewPassword) && <WarningMsg >{specialStr} 일치하지 않습니다.</WarningMsg>}
            </div>
            
            <AccountButton onClick={handleSumbit}>비밀번호 변경</AccountButton>
        </AccountContent>
    )
}