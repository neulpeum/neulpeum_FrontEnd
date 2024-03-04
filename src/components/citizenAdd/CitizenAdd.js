import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import HeaderComponent from "../../components/header/Header";
import axios from "axios";


export default function CitizenAdd() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [takingDrug, setTakingDrug] = useState("");
  const [notes, setNotes] = useState("");
  
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const navigateToCitizens = () => {
    navigate("/citizens", {});
  };

  const handleSubmit = () => {
    const addCitizen = async () => {
      if (name === "" || address === "" || medicalHistory ==="" || takingDrug === "" || notes === "") {
        return alert('모든 항목을 입력해주세요');
      }
      try {
        setError(null);
        const data = {
          patientName: name,
          address: address,
          disease: medicalHistory,
          speicalReport: notes,
          takingDrug: takingDrug,
        };
        
        await axios.post("http://52.78.35.193:8080/api/patient", data);
        alert('주민이 추가되었습니다');
        navigateToCitizens();
      } catch (e) {
        setError(e);
      }
    };
    addCitizen();
  };

  const handleCancel = () => {
    navigateToCitizens();
  };

  if (error) return alert('에러가 발생했습니다')
  
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
                    <label>복용중인 약</label>
                    <input type="text" value={takingDrug} onChange={e => setTakingDrug(e.target.value)} placeholder="ex) 감기약" />
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