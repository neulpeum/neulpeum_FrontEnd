import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddCounseling() {
  Modal.setAppElement("#root");

  const location = useLocation();
  const patientId = location.state.patientId;
  const patientName = location.state.patientName;
  // const tempProviderName = "박서연";
  // const providerName = tempProviderName;

  const date = new Date();
  const today = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  const [data, setData] = useState([""]);
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
      takingDrug: data[0],
      consultContent: data[1],
    };

    console.log(consultData);

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

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    document.body.style = "overflow: hidden";
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style = "overflow: auto";
  };

  return (
    <div>
      <div className="addCounseling-wrapper">
        <div className="counselTitle-wrapper">
          <p className="counselName"> {patientName} </p>
          <p className="counselTitle"> 님 상담추가 </p>
        </div>
        <div className="counsel-wrapper">
          <div className="counsel-category-wrapper">
            <p> 상담일자 </p>
          </div>
          <div className="counsel-content-wrapper">
            <p> {today} </p>
          </div>
          <div className="counsel-category-wrapper">
            <p> 상담자 </p>
          </div>
          <div className="counselPro-content-wrapper">
            <input
              type="text"
              value={data[0]}
              onChange={(e) => handleChange(0, e)}
            />{" "}
            {/* <p>{tempProviderName}</p> */}
          </div>
          <div className="counsel-category-wrapper">
            <p> 제공 otc </p>
          </div>
          <div className="counselOtc-content-wrapper">
            {/* 콤보박스 구현 예정 */}
          </div>
          <div className="counsel-category-wrapper">
            <p> 상담내용 </p>
          </div>
          <div className="counsel-content-wrapper">
            <textarea
              className="counselTextarea"
              value={data[1]}
              onChange={(e) => handleChange(1, e)}
              onKeyDown={autoResizeTextarea}
              onKeyUp={autoResizeTextarea}
            ></textarea>
          </div>
        </div>
        <div>
          <div className="counsel-btn-wrapper">
            <button onClick={openModal}> 저장 </button>
            <Modal className="addCounsel-modal" isOpen={isOpen}>
              <div className="addModal-wrapper">
                <div className="addModal-gr"> </div>
                <div className="addModal-content-wrapper">
                  <p> 저장하시겠습니까 ? </p>
                  <div className="addModal-btn-wrapper">
                    <button onClick={handleSaveClick}> 저장 </button>
                    <button onClick={closeModal}> 취소 </button>
                  </div>
                </div>
              </div>
            </Modal>
            <button
              onClick={() =>
                navigate("/citizensDetails", {
                  state: { id: patientId, isButtonClicked: true },
                })
              }
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
