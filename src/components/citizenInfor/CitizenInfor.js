import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function CitizenInfor() {
  const location = useLocation();
  const patientId = location.state.id;
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [fields, setFields] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [originalFields, setOriginalFields] = useState([...fields]);
  const inputRefs = useRef([]);

  const birthDateRegex =
    /^(?:\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])[-]\d{1}|)$/;
  const phoneNumRegex = /^(?:\d{3}[-]\d{4}[-]\d{4}|)$/;

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

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://52.78.35.193:8080/api/patientInfo?patientId=${patientId}`
      );
      const newData = response.data;

      const replaceNullWithEmptyString = (value) =>
        value === null ? "" : value;
      setFields(Object.values(newData).map(replaceNullWithEmptyString));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalFields([...fields]);
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  const handleCancelClick = () => {
    document.querySelector(".birthDateError").style.display = "none";
    document.querySelector(".phoneNumError").style.display = "none";
    setIsEditing(false);
    // 취소 버튼을 클릭하면 아무것도 하지 않습니다.
    setFields([...originalFields]);
  };

  const handleSaveClick = async () => {
    let dateFlag = 0;
    let numFlag = 0;

    if (!birthDateRegex.test(fields[2])) {
      document.querySelector(".birthDateError").style.display = "block";
      dateFlag = 1;
    } else {
      document.querySelector(".birthDateError").style.display = "none";
      dateFlag = 0;
    }

    if (!phoneNumRegex.test(fields[3])) {
      document.querySelector(".phoneNumError").style.display = "block";
      numFlag = 1;
    } else {
      document.querySelector(".phoneNumError").style.display = "none";
      numFlag = 0;
    }

    if (dateFlag == 0 && numFlag == 0) {
      setIsEditing(false);

      const patientData = {
        patientId: fields[0],
        patientName: fields[1],
        birthDate: fields[2],
        phoneNum: fields[3],
        address: fields[4],
        disease: fields[5],
        specialReport: fields[6],
      };
      axios
        .put("http://52.78.35.193:8080/api/patientInfo", patientData)
        .then(() => {
          console.log("Request sent successfully.");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  const regexStyle = {
    display: "inline-block",
    fontSize: "0.6875rem",
    margin: "0",
    color: "#FF4949",
    display: "none",
  };

  // Enter 키를 눌렀을 때 다음 입력란으로 포커스 이동
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = index + 1;
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
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
                ref={(el) => (inputRefs.current[0] = el)}
                onKeyDown={(e) => handleKeyDown(e, 0)}
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
                ref={(el) => (inputRefs.current[1] = el)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
              />
            ) : (
              <div>
                {fields[2] ? <span>{fields[2]}******</span> : <span> </span>}
              </div>
            )}
            <p className="birthDateError" style={regexStyle}>
              ※ 주민번호 형식에 맞지 않습니다.
            </p>
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
                ref={(el) => (inputRefs.current[2] = el)}
                onKeyDown={(e) => handleKeyDown(e, 2)}
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
                ref={(el) => (inputRefs.current[3] = el)}
                onKeyDown={(e) => handleKeyDown(e, 3)}
              />
            ) : (
              <div>
                <span>{fields[3]}</span>
              </div>
            )}
            <p className="phoneNumError" style={regexStyle}>
              ※ 연락처 형식에 맞지 않습니다.
            </p>
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
                ref={(el) => (inputRefs.current[4] = el)}
                onKeyDown={(e) => handleKeyDown(e, 4)}
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
                value={fields[6]}
                onChange={(e) => handleChange(6, e)}
                onKeyDown={autoResizeTextarea}
                onKeyUp={autoResizeTextarea}
                ref={(el) => (inputRefs.current[5] = el)}
              ></textarea>
            ) : (
              <div>
                <span>{fields[6]}</span>
              </div>
            )}
          </div>
          <div className="category-wrapper">
            <p> 등록일자 </p>
          </div>
          <div className="content-wrapper">
            <span>{fields[7] ? fields[7].split(" ")[0] : ""}</span>
          </div>
          <div className="category-wrapper">
            <p> 수정일자 </p>
          </div>
          <div className="content-wrapper">
            <span>{fields[8] ? fields[8].split(" ")[0] : ""}</span>
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
