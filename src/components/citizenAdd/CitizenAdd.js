import React, { useState } from 'react';
import HeaderComponent from "../../components/header/Header";


export default function CitizenAdd() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    // 주민 추가 로직 구현
  };
  const handleCancel = () => {
    // 취소 로직 구현
  };


  return (
    <div>
        <HeaderComponent />
        <div className="citizenAdd-wrapper">
            <div className="line-text">
                <div className="line" />
                <span>주민 추가하기</span>
                <div className="line" />
            </div>
            <div className="input-wrapper">
                <div className="input-field">
                    <label className="input-label">이름</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="input-field">
                    <label>주소</label>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className="input-field">
                    <label>병력</label>
                    <input type="text" value={medicalHistory} onChange={e => setMedicalHistory(e.target.value)} placeholder="ex) 당뇨, 고혈압" />
                </div>
                <div className="input-field">
                    <label>특이사항</label>
                    <input type="text" value={notes} onChange={e => setNotes(e.target.value)} />
                </div>
            </div>
            <div className='button-wrapper'>
                <button className="citizen-add-button" onClick={handleSubmit}>추가</button>
                <button className="citizen-add-button" onClick={handleCancel}>취소</button>
            </div>
        </div>
    </div>
  );
}