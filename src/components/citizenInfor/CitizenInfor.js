import React from "react";
import name from "./ic_name.svg";
import regiNum from "./ic_regiNum.svg";
import address from "./ic_address.svg";
import phoneNum from "./ic_phoneNum.svg";
import disease from "./ic_disease.svg";
import medicine from "./ic_medicine.svg";
import etc from "./ic_etc.svg";
import "./CitizenInfor.css";

export default function CitizenInfor() {
  return (
    <div>
      <div className="citizenInfor-wrapper">
        <div className="infor-wrapper">
          <div className="category-wrapper">
            <img src={name} className="name-icon" alt="이름" />
            <p> 이름 </p>
          </div>
          <div className="content-wrapper">
            <p> 홍xx </p>
          </div>
          <div className="category-wrapper">
            <img src={regiNum} className="regiNum-icon" alt="주민번호" />
            <p> 주민번호 </p>
          </div>
          <div className="content-wrapper">
            <p> 4202111 - 1 ** ** ** </p>
          </div>
          <div className="category-wrapper">
            <img src={address} className="address-icon" alt="주소" />
            <p> 주소 </p>
          </div>
          <div className="content-wrapper">
            <p> 서울특별시 @ @구 @ @동 </p>
          </div>
          <div className="category-wrapper">
            <img src={phoneNum} className="phoneNum-icon" alt="연락처" />
            <p> 연락처 </p>
          </div>
          <div className="content-wrapper">
            <p> 010 - 1234 - 5678 </p>{" "}
          </div>
          <div className="category-wrapper">
            <img src={disease} className="disease-icon" alt="병력" />
            <p> 병력 </p>
          </div>
          <div className="content-wrapper">
            <p> 당뇨 </p> <button className="plus-btn"> 추가 </button>
          </div>
          <div className="category-wrapper">
            <img src={medicine} className="medicine-icon" alt="복용중인 약" />
            <p> 복용중인 약 </p>
          </div>
          <div className="content-wrapper">
            <p> 두통약, 진통제 </p> <button className="plus-btn"> 추가 </button>
          </div>
          <div className="category-wrapper">
            <img src={etc} className="etc-icon" alt="특이사항" />
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
        <div className="btn-wrapper">
          <button className=""> 확인 </button>
          <button className=""> 취소 </button>
        </div>
      </div>
    </div>
  );
}
