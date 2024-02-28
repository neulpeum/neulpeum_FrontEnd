import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddCounseling() {
  const data = [
    {
      date: "2024.07.26",
      counultant: "김@@",
      otc: "두통약",
      content: "혼자 계셔서 약을 잘 안 챙겨드신다...",
    },
  ];
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="addCounseling-wrapper">
        <p className="counselTitle">홍xx님 상담추가</p>
        <div className="counsel-wrapper">
          <div className="counsel-category-wrapper">
            <p> 상담일자 </p>{" "}
          </div>{" "}
          <div className="counsel-content-wrapper">
            <input type="text" value="2024.07.26" />
          </div>{" "}
          <div className="counsel-category-wrapper">
            <p> 상담자 </p>{" "}
          </div>{" "}
          <div className="counsel-content-wrapper">
            <input type="text" value="김@@" />
          </div>{" "}
          <div className="counsel-category-wrapper">
            <p> 제공 otc </p>{" "}
          </div>{" "}
          <div className="counsel-content-wrapper">
            <input type="text" value="두통약" />
          </div>{" "}
          <div className="counsel-category-wrapper">
            <p> 상담내용 </p>{" "}
          </div>{" "}
          <div className="counsel-content-wrapper">
            <p> 혼자 계셔서 약을 잘 안 챙겨드신다...</p>{" "}
          </div>{" "}
        </div>{" "}
        <div>
          <div className="counsel-btn-wrapper">
            <button onClick={() => navigate(-1)}> 취소 </button>
            <button onClick={() => navigate(-1)}> 저장 </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
