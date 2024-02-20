import React, { useState} from "react";
import HeaderComponent from '../../components/header/Header';

const AccountSetting = () => {
    // const [adminId, setAdminId] = useState(null);
    // const [adminPd, setAdminPassword] = useState(null);
    return (
        <div>
            <HeaderComponent/>
            <div className='account-wrapper'>
                <div className='account-container'>
                    <div className="switch-button-container">
                        <button>관리자 계정 변경</button>
                        <button>대학생 비밀번호 변경</button>
                    </div>
                    <div className='account-input-wrapper'>
                        <div className="account-input-container">
                            <span>관리자 계정 변경하기</span>
                            <input 
                            type='text' 
                            placeholder="새 아이디 입력" 
                            id="admin_id"/>
                            <input 
                            type='text' 
                            placeholder="새 비밀번호 입력" 
                            password="admin_password"/>
                            <button>계정 변경</button>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default AccountSetting;