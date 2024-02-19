import React, { useState } from "react";

export default function CitizenInfor() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("초기 정보");
  const [originalText, setOriginalText] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalText(text);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // 취소 버튼을 클릭하면 아무것도 하지 않습니다.
    setText(originalText);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // 여기에 정보 저장 로직을 추가할 수 있습니다.
    console.log("저장됨:", text);
  };

  const handleChange = (e) => {
    setText(e.target.value);
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
                value={text}
                onChange={handleChange}
                autoFocus // 수정 모드 진입 시 자동으로 포커스 설정
              />
            ) : (
              <div>
                <span>{text}</span>
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
            <p> 4202111 - 1 ** ** ** </p>
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
            <p> 서울특별시 @ @구 @ @동 </p>
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
            <p> 010 - 1234 - 5678 </p>
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
            <p> 당뇨 </p> <button className="plus-btn"> 추가 </button>
          </div>
          <div className="category-wrapper">
            <img src="/icons/ic_etc.svg" className="etc-icon" alt="특이사항" />
            <p> 특이사항 </p>
          </div>
          <div className="content-wrapper">
            <p> 병원에서 고혈압 진단 받으심.병원약 주 1 회 복용중 </p>
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
