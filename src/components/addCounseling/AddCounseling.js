import React from "react";
import "./AddCounseling.css";

export default function AddCounseling() {
  return (
    <div>
      <div className="addCounseling-wrapper">
        <p className="counselTitle">홍XX님 상담추가</p>
        <div className="counsel-wrapper">
          <div className="counsel-category-wrapper">
            <p> 상담일자 </p>{" "}
          </div>{" "}
          <div className="counsel-content-wrapper">
            <p> 2024.07.26 </p>{" "}
          </div>{" "}
          <div className="counsel-category-wrapper">
            <p> 상담자 </p>{" "}
          </div>{" "}
          <div className="counsel-content-wrapper">
            <p>김@@</p>{" "}
          </div>{" "}
          <div className="counsel-category-wrapper">
            <p> 제공 otc </p>{" "}
          </div>{" "}
          <div className="counsel-content-wrapper">
            <p> 두통약 </p>{" "}
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
            <button> 취소 </button> <button> 저장 </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
