import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddCounseling() {
  const location = useLocation();
  const patientId = location.state.patientId;
  const patientName = location.state.patientName;
  // const tempProviderName = "박서연";
  // const providerName = tempProviderName;

  const date = new Date();
  const today = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}`;
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleChange = (index, e) => {
    const newFields = [...data];
    newFields[index] = e.target.value;
    setData(newFields);
  };

  const autoResizeTextarea = () => {
    let textarea = document.querySelector(".counselTextarea");

    if (textarea) {
      textarea.style.height = "auto";
      let height = textarea.scrollHeight;
      textarea.style.height = `${height + 8}px`;
    }
  };

  const handleSaveClick = async () => {
    const consultData = {
      patientId: `${patientId}`,
      // providerName: `${providerName}`,
      providerName: data[0],
      takingDrug: data[1],
      consultContent: data[2],
    };

    axios
      .post("http://52.78.35.193:8080/api/patient/consult", consultData)
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    navigate("/citizensDetails", {
      state: { id: patientId, isButtonClicked: true },
    });
  };

  return (
    <div>
      <div className="addCounseling-wrapper">
        <p className="counselTitle">{patientName}님 상담추가</p>
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
            <input
              type="text"
              value={data[0]}
              onChange={(e) => handleChange(0, e)}
            />
            {/* <p>{tempProviderName}</p> */}
          </div>
          <div className="counsel-category-wrapper">
            <p> 제공 otc </p>
          </div>
          <div className="counsel-content-wrapper">
            <input
              type="text"
              value={data[1]}
              onChange={(e) => handleChange(1, e)}
            />
          </div>
          <div className="counsel-category-wrapper">
            <p> 상담내용 </p>
          </div>
          <div className="counsel-content-wrapper">
            <textarea
              className="counselTextarea"
              value={data[2]}
              onChange={(e) => handleChange(2, e)}
              onKeyDown={autoResizeTextarea}
              onKeyUp={autoResizeTextarea}
            ></textarea>
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
