import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./Modal.css";

export default function ConsultModal({ onClose, consultId }) {
  Modal.setAppElement("#root");

  const [consultData, setConsultData] = useState([]);

  useEffect(() => {
    getConsultData();
    document.body.style = "overflow: hidden";
  }, []);

  const getConsultData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/patient/consultInfo?consultId=${consultId}`
      );
      setConsultData(response.data);
      setFields(response.data.consultContent);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [fields, setFields] = useState("");
  const [originalFields, setOriginalFields] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalFields(fields);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // 취소 버튼을 클릭하면 아무것도 하지 않습니다.
    setFields(originalFields);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const newConsultData = {
      consultId: `${consultId}`,
      providerName: `${consultData.providerName}`,
      consultContent: `${fields}`,
      takingDrug: `${consultData.takingDrug}`,
    };

    axios
      .put(
        `http://localhost:8080/api/patient/consultInfo?consultId=${consultId}`,
        newConsultData
      )
      .then(() => {
        console.log("Request sent successfully.");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (e) => {
    setFields(e.target.value);
  };

  const autoResizeTextarea = () => {
    let textarea = document.querySelector(".modalCounselTextarea");

    if (textarea) {
      textarea.style.height = "auto";
      let height = textarea.scrollHeight;
      textarea.style.height = `${height + 8}px`;
    }
  };

  return (
    <div className="modal-back">
      <Modal className="counsel-modal" isOpen={true}>
        <div className="modal-warpper">
          <div className="modal-content-wrapper">
            <div className="modal-title">
              <div>
                <p className="m-name">{consultData.providerName}</p>
                <p>&nbsp;님이&nbsp;</p>
                <p className="m-date"> {consultData.consultDate} </p>
                <p>에</p>
                <br></br>
                <p>상담한 내용입니다.</p>
              </div>
              <div>
                <img
                  src="/icons/ic_closeBtn.svg"
                  className="close-icon"
                  alt="X"
                  onClick={onClose}
                />
              </div>
            </div>
            <div className="modal-content">
              <div className="modal-otc">
                <p className="m-otc">제공OTC: {consultData.takingDrug}</p>
              </div>
              <div className="modal-counsel">
                {isEditing ? (
                  <textarea
                    className="modalCounselTextarea"
                    value={fields}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={autoResizeTextarea}
                    onKeyUp={autoResizeTextarea}
                  ></textarea>
                ) : (
                  // <input
                  //   type="text"
                  //   value={fields}
                  //   onChange={(e) => handleChange(e)}
                  // />
                  <div>
                    <p>{fields}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-btn-warpper">
              {isEditing ? (
                <div>
                  <button onClick={handleSaveClick}>확인</button>
                  <button onClick={handleCancelClick}>취소</button>
                </div>
              ) : (
                <div>
                  <button onClick={handleEditClick}>수정</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
