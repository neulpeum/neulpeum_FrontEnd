import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddCounseling() {
  const location = useLocation();
  const patientId = location.state.patientId;
  const tempProviderName = "박서연";
  const providerName = tempProviderName;

  const date = new Date();
  const today = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}`;
  const [data, setData] = useState([
    "두통약",
    "혼자 계셔서 약을 잘 안 챙겨드신다...",
  ]);
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-1);
  };

  const handleChange = (index, e) => {
    const newFields = [...data];
    newFields[index] = e.target.value;
    setData(newFields);
  };

  const handleSaveClick = async () => {
    const consultData = {
      patientId: `${patientId}`,
      providerName: `${providerName}`,
      takingDrug: data[0],
      consultContent: data[1],
    };

    axios
      .post("http://localhost:8080/api/patient/consult", consultData)
      .then(() => {
        console.log("Request sent successfully.");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    onCancel();
  };

  return (
    <div>
      <div className="addCounseling-wrapper">
        <p className="counselTitle">홍xx님 상담추가</p>
        <div className="counsel-wrapper">
          <div className="counsel-category-wrapper">
            <p> 상담일자 </p>
          </div>
          <div className="counsel-content-wrapper">
            <p>{today}</p>
          </div>
          <div className="counsel-category-wrapper">
            <p> 상담자 </p>
          </div>
          <div className="counsel-content-wrapper">
            <p>{tempProviderName}</p>
          </div>
          <div className="counsel-category-wrapper">
            <p> 제공 otc </p>
          </div>
          <div className="counsel-content-wrapper">
            <input
              type="text"
              value={data[0]}
              onChange={(e) => handleChange(0, e)}
            />
          </div>
          <div className="counsel-category-wrapper">
            <p> 상담내용 </p>
          </div>
          <div className="counsel-content-wrapper">
            <input
              type="text"
              value={data[1]}
              onChange={(e) => handleChange(1, e)}
            />
          </div>
        </div>
        <div>
          <div className="counsel-btn-wrapper">
            <button onClick={() => navigate(-1)}> 취소 </button>
            <button onClick={handleSaveClick}> 저장 </button>
          </div>
        </div>
      </div>
    </div>
  );
}
