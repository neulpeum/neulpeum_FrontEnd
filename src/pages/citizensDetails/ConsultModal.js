import React, { useState, useEffect, useRef, useCallback } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "styles/ForPages/CitizensDetails/ConsultModal.css";

export default function ConsultModal({ onClose, consultId, patientId }) {
  Modal.setAppElement("#root");

  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [consultData, setConsultData] = useState([]);
  const [formattedDateTime, setFormattedDateTime] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fields, setFields] = useState("");
  const [isFieldsModified, setIsFieldsModified] = useState(false);
  const [originalFields, setOriginalFields] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const removeRef = useRef(null);
  const btnRef = useRef(null);
  const modal = document.querySelector(".modalOut");

  const getConsultData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/patient/consultInfo?consultId=${consultId}`
      );
      setConsultData(response.data);
      setFields(response.data.consultContent);
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        alert("접근 권한이 없습니다");
        navigate(-1);
        return;
      }
      console.error("Error fetching data:", error);
    }
  }, [consultId, navigate]);

  useEffect(() => {
    getConsultData();
    document.body.style = "overflow: hidden";

    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        if (removeRef.current) {
          closeRemoveModal();
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keyup", handleEscKey, false);
    return () => {
      document.removeEventListener("keyup", handleEscKey, false);
    };
  }, [getConsultData, onClose]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const tagName = event.target.tagName.toLowerCase();

      if (
        tagName !== "img" &&
        removeRef.current &&
        !removeRef.current.contains(event.target)
      ) {
        closeRemoveModal();
      } else if (
        tagName !== "button" &&
        modal &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [modal, onClose]);

  useEffect(() => {
    if (consultData.consultDate) {
      const datetimeParts = consultData.consultDate.split(" "); // 공백을 기준으로 날짜와 시간을 분리
      const dateString = datetimeParts[0]; // 날짜 부분
      const timeString = datetimeParts[1]; // 시간 부분

      const dateParts = dateString.split("."); // 날짜를 연도, 월, 일로 분리
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];

      const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][
        new Date(year, month - 1, day).getDay()
      ];

      setFormattedDateTime(
        `${year}.${month}.${day} (${dayOfWeek}) ${timeString}`
      );
    }
  }, [consultData]);

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalFields(fields);
  };

  useEffect(() => {
    if (isEditing) {
      const firstInput = inputRefs.current[0];
      if (firstInput) {
        const length = firstInput.value.length;
        firstInput.setSelectionRange(length, length);
        firstInput.focus();
      }
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing) {
      setIsFieldsModified(fields !== originalFields);
    }
  }, [fields]);

  const handleCancelClick = () => {
    setIsEditing(false);
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
      .put(`/api/patient/consultInfo?consultId=${consultId}`, newConsultData)
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    onClose();
  };

  const handleChange = (e) => {
    setFields(e.target.value);
  };

  const openRemoveModal = () => {
    setIsRemoveOpen(true);
  };

  const closeRemoveModal = () => {
    setIsRemoveOpen(false);
  };

  const handleRemoveClick = async () => {
    axios
      .delete(`/api/patient/consultDelete?consultId=${consultId}`)
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    navigate("/citizensDetails", {
      state: { id: patientId },
    });
    onClose();
  };

  return (
    <div className="modal-back">
      <Modal className="counsel-modal" isOpen={true}>
        <div ref={modalRef} className="modalOut">
          <div className="modal-wrapper">
            <div className="modal-content-wrapper">
              <div className="modal-title">
                <div>
                  <p>
                    <span className="m-name">{consultData.providerName}</span>
                    님이
                    <span className="m-date"> {formattedDateTime}</span>에
                    <br /> 상담한 내용입니다.
                  </p>
                </div>
                <div className="modal-img-wrapper">
                  <img
                    src="/icons/ic_trashCan.svg"
                    className="trash-icon"
                    alt=""
                    onClick={openRemoveModal}
                  />
                  <Modal className="remove-modal" isOpen={isRemoveOpen}>
                    <div ref={removeRef} className="removeModal-wrapper">
                      <div className="removeModal-gr"> </div>
                      <div className="removeModal-content-wrapper">
                        <p> 삭제하시겠습니까? </p>
                        <div className="removeModal-btn-wrapper">
                          <button onClick={handleRemoveClick}> 삭제 </button>
                          <button onClick={closeRemoveModal}> 취소 </button>
                        </div>
                      </div>
                    </div>
                  </Modal>
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
                  <p className="m-otc">제공otc: {consultData.takingDrug}</p>
                </div>
                <div className="modal-counsel">
                  {isEditing ? (
                    <textarea
                      className="modalCounselTextarea"
                      value={fields}
                      ref={(el) => (inputRefs.current[0] = el)}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  ) : (
                    <div>
                      <p>{fields}</p>
                    </div>
                  )}
                </div>
              </div>
              <div ref={btnRef} className="modal-btn-wrapper">
                {isEditing ? (
                  <div>
                    <button
                      onClick={handleSaveClick}
                      disabled={!isFieldsModified}
                    >
                      확인
                    </button>
                    <button onClick={handleCancelClick}>취소</button>
                  </div>
                ) : (
                  <div>
                    <button id="modifyBtn" onClick={handleEditClick}>
                      상담내용 수정
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
