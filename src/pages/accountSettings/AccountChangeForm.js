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
    gap: 1rem;
    padding: 2em 0;
`;
const AccountSpan = styled.span`
    font-size: 30px;
    font-weight: bold;
    white-space: nowrap;
`;
const AccountInput= styled.input`
    height: fit-content;
    width: 100%;
    text-align: left;
    padding-left: 16px;
    padding-top: 1em;
    padding-bottom: 1em;
    line-height: 1.5em;
    font-size: 20px;
    cursor: pointer;
    border: none;
`;
const AccountButton = styled.button`
    background-color: #aed391;
    border: none;
    color: white;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    padding: 1rem 2.8rem;
    border-radius: 0.5rem;
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
    background: none;
    border: none;
    cursor: pointer;
`;
const EyeIcon = styled.img`
    width: 35px;
    height: 35px;
`;
export default function AccountChangeForm({userType}) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordsVisible, setPasswordsVisible] = useState([false, false, false]);

    const [error, setError] = useState(false);
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    let specialStr = '※';

    const togglePasswordVisibility = (index) => {
        const newPasswordsVisible = [...passwordsVisible];
        newPasswordsVisible[index] = !newPasswordsVisible[index];
        setPasswordsVisible(newPasswordsVisible);
    };

    function clearInputFileds() {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }

    const handleSumbit = async () => {
        if (!passwordRegex.test(newPassword)) return(alert('비밀번호는 알파벳 숫자 조합 6자리 이상이어야 합니다.'));
    
        const body = {
            currentPassword : currentPassword,
            newPassword : newPassword,
        };
    
        let url;
        if (userType === 'admin') {
            url = "/api/admin";
        } else if (userType === 'user') {
            url = "/api/admin/changePw";
        }
    
        axios.patch(url, body)
        .then((res) => {
            clearInputFileds()
            alert(`${userType === 'admin' ? '관리자' : '대학생'} 비밀번호가 성공적으로 변경되었습니다.`);
        })
        .catch((error) => setError(error));
    }

    return (
        <AccountContent>
            <AccountSpan>{(userType === 'admin') ? '관리자 비밀번호 변경하기' : '대학생 비밀번호 변경하기'}</AccountSpan>
            <div style={{ width: '56.3%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid black'}}>
                    <AccountInput 
                    type={passwordsVisible[0] ? 'text' : 'password'}
                    id='current_password'
                    value={currentPassword} 
                    placeholder='현재 비밀번호 입력'
                    onChange={(e) => setCurrentPassword(e.target.value)}/>
                    <ToggleButton onClick={() => togglePasswordVisibility(0)}>
                        <EyeIcon src={passwordsVisible[0] ? "/icons/ic_open_eye.svg" : "/icons/ic_closed_eye.svg"} alt="Toggle password visibility" />
                    </ToggleButton>
                </div>
                {(error) && <WarningMsg>{specialStr} 비밀번호를 잘못 입력하셨습니다.</WarningMsg>}
            </div>

            <div style={{display: 'flex', flexDirection: 'column', width: '56.3%', marginTop: '20px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid black', borderBottom: 'none' }} >
                    <AccountInput 
                        type={passwordsVisible[1] ? 'text' : 'password'}
                        id='new_password'
                        value={newPassword} 
                        placeholder='새 비밀번호 입력'
                        onChange={(e) => setNewPassword(e.target.value)}/>
                    <ToggleButton onClick={() => togglePasswordVisibility(1)}>
                        <EyeIcon src={passwordsVisible[1] ? "/icons/ic_open_eye.svg" : "/icons/ic_closed_eye.svg"} alt="Toggle password visibility" />
                    </ToggleButton>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid black' }}>
                    <AccountInput 
                        type={passwordsVisible[2] ? 'text' : 'password'}
                        id='confirm_new_password'
                        value={confirmNewPassword} 
                        placeholder='새 비밀번호 확인'
                        onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                    <ToggleButton onClick={() => togglePasswordVisibility(2)}>
                        <EyeIcon src={passwordsVisible[2] ? "/icons/ic_open_eye.svg" : "/icons/ic_closed_eye.svg"} alt="Toggle password visibility" />
                    </ToggleButton>
                </div>
                {<GuideMsg>{specialStr} 알파벳 숫자 조합 6자리 이상</GuideMsg>}
                {(newPassword !== confirmNewPassword) && <WarningMsg >{specialStr} 일치하지 않습니다.</WarningMsg>}
            </div>
            
            <AccountButton onClick={handleSumbit}>비밀번호 변경</AccountButton>
        </AccountContent>
    )
}