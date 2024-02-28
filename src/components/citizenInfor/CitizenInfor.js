import React, { useState } from "react";

export default function CitizenInfor() {
  const [fields, setFields] = useState([
    "홍xx",
    "420211-1******",
    "서울특별시 @@구 @@동",
    "010-1234-5678",
    "당뇨",
    "병원에서 고혈압 진단 받으심.",
  ]);
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

  const handleSaveClick = () => {
    setIsEditing(false);
    // 여기에 정보 저장 로직을 추가할 수 있습니다.
    console.log("저장됨:", fields);
  };

  const handleChange = (index, e) => {
    const newFields = [...fields];
    newFields[index] = e.target.value;
    setFields(newFields);
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
                value={fields[0]}
                onChange={(e) => handleChange(0, e)}
              />
            ) : (
              <div>
                <span>{fields[0]}</span>
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
                value={fields[2]}
                onChange={(e) => handleChange(2, e)}
              />
            ) : (
              <div>
                <span>{fields[2]}</span>
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
            <img src="/icons/ic_etc.svg" className="etc-icon" alt="특이사항" />
            <p> 특이사항 </p>
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
            <p> 등록일자 </p>
          </div>
          <div className="content-wrapper">
            <p> 2023 - 05 - 07 </p>
          </div>
          <div className="category-wrapper">
            <p> 수정일자 </p>
          </div>
          <div className="content-wrapper">
            <p> 2023 - 12 - 25 </p>
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
              <button onClick={handleCancelClick}>취소</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
