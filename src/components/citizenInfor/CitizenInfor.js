import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CitizenInfor() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    getData();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 769);
  };

  useEffect(() => {
    setIsEditing(false);
  }, [isLargeScreen]);

  const [fields, setFields] = useState([]);

  const getData = async () => {
    let tempPatientId = 1;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/patientInfo?patientId=${tempPatientId}`
      );
      const newData = response.data;
      setFields(Object.values(newData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [originalFields, setOriginalFields] = useState([...fields]);

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalFields([...fields]);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // 취소 버튼을 클릭하면 아무것도 하지 않습니다.
    setFields([...originalFields]);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const patientData = {
      patientId: fields[0],
      patientName: fields[1],
      birthDate: fields[2],
      phoneNum: fields[3],
      address: fields[4],
      disease: fields[5],
      takingDrug: fields[6],
      specialReport: fields[7],
    };

    axios
      .put("http://localhost:8080/api/patientInfo", patientData)
      .then(() => {
        console.log("Request sent successfully.");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (index, e) => {
    const newFields = [...fields];
    newFields[index] = e.target.value;
    setFields(newFields);
  };

  const autoResizeTextarea = () => {
    let textarea = document.querySelector(".inforCounselTextarea");

    if (textarea) {
      textarea.style.height = "auto";
      let height = textarea.scrollHeight;
      textarea.style.height = `${height + 8}px`;
    }
  };

  return (
    <div>
      <div className="citizenInfor-wrapper">
        <div className="infor-wrapper">
          <div className="category-wrapper">
            <img
              src="/icons/ic_citizenName.svg"
              className="name-icon"
              alt="이름"
            />
            <p> 이름 </p>
          </div>
          <div className="content-wrapper">
            {isEditing ? (
              <input
                type="text"
                value={fields[1]}
                onChange={(e) => handleChange(1, e)}
              />
            ) : (
              <div>
                <span>{fields[1]}</span>
              </div>
            )}
          </div>
          <div className="category-wrapper">
            <img
              src="/icons/ic_regiNum.svg"
              className="regiNum-icon"
              alt="주민번호"
            />
            <p> 주민번호 </p>
          </div>
          <div className="content-wrapper">
            {isEditing ? (
              <input
                type="text"
                value={fields[2]}
                onChange={(e) => handleChange(2, e)}
              />
            ) : (
              <div>
                <span>{fields[2]}******</span>
              </div>
            )}
          </div>
          <div className="category-wrapper">
            <img
              src="/icons/ic_address.svg"
              className="address-icon"
              alt="주소"
            />
            <p> 주소 </p>
          </div>
          <div className="content-wrapper">
            {isEditing ? (
              <input
                type="text"
                value={fields[4]}
                onChange={(e) => handleChange(4, e)}
              />
            ) : (
              <div>
                <span>{fields[4]}</span>
              </div>
            )}
          </div>
          <div className="category-wrapper">
            <img
              src="/icons/ic_phoneNum.svg"
              className="phoneNum-icon"
              alt="연락처"
            />
            <p> 연락처 </p>
          </div>
          <div className="content-wrapper">
            {isEditing ? (
              <input
                type="text"
                value={fields[3]}
                onChange={(e) => handleChange(3, e)}
              />
            ) : (
              <div>
                <span>{fields[3]}</span>
              </div>
            )}
          </div>
          <div className="category-wrapper">
            <img
              src="/icons/ic_disease.svg"
              className="disease-icon"
              alt="병력"
            />
            <p> 병력 </p>
          </div>
          <div className="content-wrapper">
            {isEditing ? (
              <input
                type="text"
                value={fields[5]}
                onChange={(e) => handleChange(5, e)}
              />
            ) : (
              <div>
                <span>{fields[5]}</span>
              </div>
            )}
          </div>
          <div className="category-wrapper">
            <img src="/icons/ic_etc.svg" className="etc-icon" alt="특이사항" />
            <p> 특이사항 </p>
          </div>
          <div className="content-wrapper">
            {isEditing ? (
              <textarea
                className="inforCounselTextarea"
                value={fields[7]}
                onChange={(e) => handleChange(7, e)}
                onKeyDown={autoResizeTextarea}
                onKeyUp={autoResizeTextarea}
              ></textarea>
            ) : (
              <div>
                <span>{fields[7]}</span>
              </div>
            )}
          </div>
          <div className="category-wrapper">
            <p> 등록일자 </p>
          </div>
          <div className="content-wrapper">
            <span>{fields[8]}</span>
          </div>
          <div className="category-wrapper">
            <p> 수정일자 </p>
          </div>
          <div className="content-wrapper">
            <span>{fields[9]}</span>
          </div>
        </div>
        <div>
          {isEditing ? (
            <div className="btn-wrapper">
              <button onClick={handleSaveClick}>확인</button>
              <button onClick={handleCancelClick}>취소</button>
            </div>
          ) : (
            <div className="btn-wrapper">
              <button onClick={handleEditClick}>수정</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
