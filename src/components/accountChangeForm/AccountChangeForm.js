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
const GuideMsg = styled.div`
    color: blue;
    font-size: 18px;
`
const WarningMsg = styled.div`
    color: red;
    font-size: 18px;
`

export default function AccountChangeForm({userType}) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [response, setResponse] = useState();
    const [error, setError] = useState(null);

    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    let specialStr = '※';
    // 에러 상황: {specialStr}비밀번호를 잘못 입력하셨습니다. {specialStr}일치하지 않습니다. 
    // 디폴트 상황: {specialStr}알파벳, 숫자 조합 6자리 이상
    // 성공시 상황: 문구를 띄우지 않음

    // 나중에 [현재 비밀번호 입력], [새 비밀번호 입력], [새 비밀번호 확인] 3개의 input type='password'가 디폴트인 상황에서
    // 오른쪽에 점같이 생긴 버튼을 누르면 type='text'로 만들어서 클라이언트가 체크할 수 있도록 추가하는게 좋겠다.
    
    // [현재 비밀번호 입력] 은 axios 이후 비밀번호가 일치하지 않았을 경우에 res의 답변을 적어서 
    // [새 비밀번호 입력] 의 값은 정규식을 지켜야 한다. 그렇지 않으면 빨간색 배경 테두리가 그어질것이다.

    const handleSumbit = async () => {
        if (!passwordRegex.test(newPassword)) return(alert('비밀번호는 알파벳 숫자 조합 6자리 이상이어야 합니다.'));
    
        const body = {
            "currentPassword" : currentPassword,
            "newPassword" : newPassword
        };
    
        let url = "http://52.78.35.193:8080/api/admin";
        if (userType === 'admin') {
            return;
        } else if (userType === 'user') {
            url = `http://52.78.35.193:8080/api/admin/${newPassword}`;
        } else {
            console.log('예상치 못한 url이 생성되었습니다.');
            return;
        }
    
        axios.patch(url, body)
        .then((res) => {
            setResponse(res); //응답이 성공했을경우
        })
        .catch((error) => {
            setError(error);
        });
    }
    
    if (error) console.error(error);
    if (response) console.log(response.headers);

    return (
        <AccountContent>
            <AccountSpan>{(userType === 'admin') ? '관리자 비밀번호 변경하기' : '대학생 비밀번호 변경하기'}</AccountSpan>
            <div>
                <AccountInput 
                type='text' 
                id='current_password'
                value={currentPassword} 
                placeholder='현재 비밀번호 입력'
                onChange={(e) => setCurrentPassword(e.target.value)}/>
                {(error && error.code === 400) && <WarningMsg>{specialStr} 비밀번호를 잘못 입력하셨습니다.</WarningMsg> }
            </div>

            <div style={{display: 'flex', flexDirection: 'column'}}>
                <AccountInput 
                type='text' 
                id='new_password'
                value={newPassword} 
                placeholder='새 비밀번호 입력'
                onChange={(e) => setNewPassword(e.target.value)}/>
                <AccountInput 
                type='text' 
                id='confirm_new_password'
                value={confirmNewPassword} 
                placeholder='새 비밀번호 확인'
                onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                {<GuideMsg>{specialStr} 알파벳 숫자 조합 6자리 이상</GuideMsg>}
                {(newPassword !== confirmNewPassword) && <WarningMsg >{specialStr} 일치하지 않습니다.</WarningMsg>}
            </div>
            
            <AccountButton onClick={handleSumbit}>비밀번호 변경</AccountButton>
        </AccountContent>
    )
}