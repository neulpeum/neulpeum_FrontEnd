import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "styles/ForPages/CitizensDetails/CitizenInfor.css";
import HouseIcon from "Images/ic_house.svg";

export default function CitizenInfor(props) {
  const { onLoadingUpdate } = props;
  const location = useLocation();
  const patientId = location.state.id;
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [fields, setFields] = useState([]);
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [originallActiveButton, setOriginalActiveButton] = useState(null);
  const [isFieldsModified, setIsFieldsModified] = useState(false);
  const [originalFields, setOriginalFields] = useState([...fields]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const villages = ["위 1,2", "위 3,4", "아래 1,2", "아래 3,4"];

  const birthDateRegex = /^(?:\d{6}[-]\d{1}|)$/;
  const phoneNumRegex = /^(?:\d{3}[-]\d{4}[-]\d{4}|)$/;
  const homeNumRegex = /^(?:\d{2}[-]\d{3}[-]\d{4}|)$/;
  const isPhoneNumberValid =
    phoneNumRegex.test(fields[3]) || homeNumRegex.test(fields[3]);

  useEffect(() => {
    const getData = async () => {
      try {
        onLoadingUpdate(true);
        const response = await axios.get(
          `/api/patientInfo?patientId=${patientId}`
        );
        const newData = response.data;
        const replaceNullWithEmptyString = (value) =>
          value === null ? "" : value;
        setFields(Object.values(newData).map(replaceNullWithEmptyString));
        // 주소 설정
        const splitIndex = response.data.address.indexOf(
          " ",
          response.data.address.indexOf(" ") + 1
        );
        const main = response.data.address.substring(0, splitIndex);
        const sub = response.data.address.substring(splitIndex + 1);
        setActiveButton(main);
        setAddress(sub);
        setFields((prevData) => {
          const updatedData = [...prevData];
          updatedData[4] = sub;
          return updatedData;
        });
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
      onLoadingUpdate(false);
    };
    getData();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [patientId]);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 769);
  };

  useEffect(() => {
    setIsEditing(false);
    document.querySelector(".birthDateError").style.display = "none";
    document.querySelector(".phoneNumError").style.display = "none";
  }, [isLargeScreen]);

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalFields([...fields]);
    setOriginalActiveButton(activeButton);
  };

  useEffect(() => {
    if (isEditing) {
      const firstInput = inputRefs.current[0];
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing) {
      setIsFieldsModified(
        !areArrayEqual(originalFields, fields) ||
          !areArrayEqual(activeButton, originallActiveButton)
      );
    }
  }, [fields, isEditing, originalFields, activeButton]);

  const handleCancelClick = () => {
    document.querySelector(".birthDateError").style.display = "none";
    document.querySelector(".phoneNumError").style.display = "none";
    setIsEditing(false);
    setFields([...originalFields]);
    setActiveButton(originallActiveButton);
  };

  function areArrayEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  const handleButtonClick = (village) => {
    setActiveButton(village);
  };

  const handleSaveClick = async () => {
    let dateFlag = 0;
    let numFlag = 0;
    let addressFlag = 0;

    if (!birthDateRegex.test(fields[2])) {
      document.querySelector(".birthDateError").style.display = "block";
      dateFlag = 1;
    } else {
      document.querySelector(".birthDateError").style.display = "none";
      dateFlag = 0;
    }

    if (!phoneNumRegex.test(fields[3]) && !homeNumRegex.test(fields[3])) {
      document.querySelector(".phoneNumError").style.display = "block";
      numFlag = 1;
    } else {
      document.querySelector(".phoneNumError").style.display = "none";
      numFlag = 0;
    }

    if (!fields[4]) {
      document.querySelector(".addressError").style.display = "block";
      addressFlag = 1;
    } else {
      document.querySelector(".addressError").style.display = "none";
      addressFlag = 0;
    }

    if (dateFlag === 0 && numFlag === 0 && addressFlag === 0) {
      if (!areArrayEqual(originalFields, fields)) {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const today = `${year}-${month}-${day}`;

        setFields((prevFields) => {
          const updatedFields = [...prevFields];
          updatedFields[8] = today;
          return updatedFields;
        });

        setAddress(fields[4]);
        const addressData = activeButton + " " + address;

        const patientData = {
          patientId: fields[0],
          patientName: fields[1],
          birthDate: fields[2],
          phoneNum: fields[3],
          address: addressData,
          disease: fields[5],
          specialReport: fields[6],
        };

        axios
          .put("/api/patientInfo", patientData)
          .then(() => {})
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        setIsFieldsModified(false);
      }
      setIsEditing(false);
    }
  };

  const regexStyle = {
    display: "none",
    fontSize: "0.8vw",
    margin: "0",
    color: "#FF4949",
    marginLeft: "1rem",
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

  // const autoResizeTextarea = () => {
  //   let textarea = document.querySelector(".inforCounselTextarea");

  //   if (textarea) {
  //     textarea.style.height = "auto";
  //     let height = textarea.scrollHeight;
  //     textarea.style.height = `${height + 8}px`;
  //   }
  // };

  if (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      alert("접근 권한이 없습니다");
      navigate(-1);
    }
    return;
  }

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
                placeholder="000000-0"
                onChange={(e) => handleChange(2, e)}
                ref={(el) => (inputRefs.current[1] = el)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
                onFocus={(e) =>
                  e.target.setSelectionRange(
                    e.target.value.length,
                    e.target.value.length
                  )
                }
              />
            ) : (
              <div>
                {fields[2] && birthDateRegex.test(fields[2]) ? (
                  <span>{fields[2]}******</span>
                ) : (
                  <span></span>
                )}
              </div>
            )}
            <p className="birthDateError" style={regexStyle}>
              <img
                src="/icons/ic_inforError.svg"
                alt="No_Data"
                className="infor-error-img"
              />
              주민번호 형식에 맞지 않습니다.
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
              <>
                <div className="address-buttons">
                  {villages.map((village) => (
                    <button
                      key={village}
                      className={
                        activeButton === village
                          ? "address-button-active"
                          : "address-button"
                      }
                      onClick={() => handleButtonClick(village)}
                    >
                      <img
                        style={
                          activeButton === village ? {} : { display: "none" }
                        }
                        src={HouseIcon}
                        alt=""
                        className="address-btn-icon"
                      />
                      {village}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={fields[4]}
                  onChange={(e) => handleChange(4, e)}
                  ref={(el) => (inputRefs.current[2] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 2)}
                  onFocus={(e) =>
                    e.target.setSelectionRange(
                      e.target.value.length,
                      e.target.value.length
                    )
                  }
                />
              </>
            ) : (
              <div>
                <span>
                  {activeButton} {address}
                </span>
              </div>
            )}
            <p className="addressError" style={regexStyle}>
              <img
                src="/icons/ic_inforError.svg"
                alt="No_Data"
                className="infor-error-img"
              />{" "}
              필수정보입니다.
            </p>
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
                placeholder="000-0000-0000 / 00-000-0000"
                onChange={(e) => handleChange(3, e)}
                ref={(el) => (inputRefs.current[3] = el)}
                onKeyDown={(e) => handleKeyDown(e, 3)}
                onFocus={(e) =>
                  e.target.setSelectionRange(
                    e.target.value.length,
                    e.target.value.length
                  )
                }
              />
            ) : (
              <div>
                {isPhoneNumberValid ? <span>{fields[3]}</span> : <span></span>}
              </div>
            )}
            <p className="phoneNumError" style={regexStyle}>
              <img
                src="/icons/ic_inforError.svg"
                alt="No_Data"
                className="infor-error-img"
              />
              연락처 형식에 맞지 않습니다.
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
                onFocus={(e) =>
                  e.target.setSelectionRange(
                    e.target.value.length,
                    e.target.value.length
                  )
                }
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
                // onKeyDown={autoResizeTextarea}
                // onKeyUp={autoResizeTextarea}
                ref={(el) => (inputRefs.current[5] = el)}
                onFocus={(e) =>
                  e.target.setSelectionRange(
                    e.target.value.length,
                    e.target.value.length
                  )
                }
              ></textarea>
            ) : (
              <div>
                <span className="textareaSpan">{fields[6]}</span>
              </div>
            )}
          </div>
          <div className="category-wrapper">
            <p> 등록일자 </p>
          </div>
          <div className="content-wrapper">
            <span>
              {fields[7] ? fields[7].split(" ")[0].replace(/\./g, "-") : ""}
            </span>
          </div>
          <div className="category-wrapper">
            <p> 수정일자 </p>
          </div>
          <div className="content-wrapper">
            <span>
              {fields[8] ? fields[8].split(" ")[0].replace(/\./g, "-") : ""}
            </span>
          </div>
        </div>
        {isEditing ? (
          <div className="btn-wrapper">
            <button onClick={handleSaveClick} disabled={!isFieldsModified}>
              확인
            </button>
            <button onClick={handleCancelClick}>취소</button>
          </div>
        ) : (
          <div className="btn-wrapper">
            <button onClick={handleEditClick}>수정</button>
          </div>
        )}
      </div>
    </div>
  );
}
