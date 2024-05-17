import React,{ useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import 'styles/ForPages/AccountSettings/AccountChangeForm.css';

const GuideMsg = styled.div`
    color: blue;
    font-size: clamp(1vw, 12px, 12px);
`
const WarningMsg = styled.div`
    color: red;
    font-size: clamp(1vw, 12px, 12px);
`
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
        if (!currentPassword) return(alert('현재 비밀번호를 입력해주십시오.'));
        if (!newPassword) return(alert('새 비밀번호를 입력해주십시오.'));
        if (!passwordRegex.test(newPassword)) return(alert('비밀번호는 알파벳 숫자 조합 6자리 이상이어야 합니다.'));
        if (newPassword !== confirmNewPassword) return(alert('새 비밀번호의 입력값과 확인값이 일치하지 않습니다.'));
    
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
        <div className='account-content'>
            <span>{(userType === 'admin') ? '관리자 비밀번호 변경하기' : '대학생 비밀번호 변경하기'}</span>
            <div className='account-inputBox'>
                <input
                type={passwordsVisible[0] ? 'text' : 'password'}
                id='current_password'
                value={currentPassword} 
                placeholder='현재 비밀번호 입력'
                onChange={(e) => setCurrentPassword(e.target.value)}/>
                <button onClick={() => togglePasswordVisibility(0)}>
                    <img src={passwordsVisible[0] ? "/icons/ic_open_eye.svg" : "/icons/ic_closed_eye.svg"} alt="Toggle password visibility" />
                </button>
                
            </div>
            <div className='warningMsg-box'>
                {(error) && <WarningMsg>{specialStr} 비밀번호를 잘못 입력하셨습니다.</WarningMsg>}
            </div>

            <div className='account-inputBox-bottomRound'>
                <input
                    type={passwordsVisible[1] ? 'text' : 'password'}
                    id='new_password'
                    value={newPassword} 
                    placeholder='새 비밀번호 입력'
                    onChange={(e) => setNewPassword(e.target.value)}/>
                <button onClick={() => togglePasswordVisibility(1)}>
                    <img src={passwordsVisible[1] ? "/icons/ic_open_eye.svg" : "/icons/ic_closed_eye.svg"} alt="Toggle password visibility" />
                </button>
            </div>
            <div className='account-inputBox-topRound'>
                <input
                    type={passwordsVisible[2] ? 'text' : 'password'}
                    id='confirm_new_password'
                    value={confirmNewPassword} 
                    placeholder='새 비밀번호 확인'
                    onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                <button onClick={() => togglePasswordVisibility(2)}>
                    <img src={passwordsVisible[2] ? "/icons/ic_open_eye.svg" : "/icons/ic_closed_eye.svg"} alt="Toggle password visibility" />
                </button>
            </div>
            <div className='warningMsg-box'>
                {<GuideMsg>{specialStr} 알파벳 숫자 조합 6자리 이상</GuideMsg>}
                {(newPassword !== confirmNewPassword) && <WarningMsg >{specialStr} 일치하지 않습니다.</WarningMsg>}
            </div>
        
            <button className='confirm-button' onClick={handleSumbit}>비밀번호 변경</button>
        </div>
    )
}