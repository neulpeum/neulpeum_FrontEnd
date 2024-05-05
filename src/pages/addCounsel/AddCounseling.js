import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "styles/ForPages/AddCounseling/AddCounseling.css";

export default function AddCounseling() {
  Modal.setAppElement("#root");

  const [isOpening, setIsOpening] = useState(true);
  const [activeIndex, setActiveIndex] = useState([]);
  const inputRefs = useRef([]);
  const [data, setData] = useState([""]);
  const [drugData, setDrugData] = useState([]);
  const [selectDrugs, setSelectDrugs] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const location = useLocation();
  const patientId = location.state.patientId;
  const patientName = location.state.patientName;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/patient/drug");
        const drugDataWithId = response.data.map((drug, index) => ({
          ...drug,
          id: index,
        }));
        setDrugData(drugDataWithId);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
    };
    getData();
    const firstInput = inputRefs.current[0];
    if (firstInput) {
      const length = firstInput.value.length;
      firstInput.setSelectionRange(length, length);
      firstInput.focus();
    }
  }, []);

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const today = `${year}.${month}.${day} ${hours}:${minutes}`;

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
    const drugNames = selectDrugs
      .map((drug) => `${drug.drugName} ${drug.usedAmount}개`)
      .join(", ");

    const consultData = {
      patientId: `${patientId}`,
      providerName: data[0],
      takingDrug: `${drugNames}`,
      consultContent: data[1],
    };

    const takingDrugData = selectDrugs.map((item) => {
      return {
        drugName: item.drugName,
        usedAmount: item.usedAmount,
      };
    });

    axios
      .post("/api/patient/consult", consultData)
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .patch("/api/patient/drug", takingDrugData)
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    document.body.style = "overflow: auto";
    navigate("/citizensDetails", {
      state: { id: patientId },
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    let providerIsValid = true;
    if (data[0] === "") {
      document.querySelector(".wrongProvider").style.display = "block";
      providerIsValid = false;
    } else {
      document.querySelector(".wrongProvider").style.display = "none";
    }

    const otcIsValid = selectDrugs.every((drug) => {
      if (!drug.hasOwnProperty("usedAmount")) {
        document.querySelector(".wrongInput").style.display = "block";
        return false;
      }
      if (!Number.isInteger(drug.usedAmount || drug.usedAmount <= 0)) {
        document.querySelector(".wrongInput").style.display = "block";
        return false;
      }
      document.querySelector(".wrongInput").style.display = "none";
      return true;
    });

    let contentIsValid = true;
    if (data[1] === "" || data.length < 2) {
      document.querySelector(".wrongContent").style.display = "block";
      contentIsValid = false;
    } else {
      document.querySelector(".wrongContent").style.display = "none";
    }

    if (otcIsValid && providerIsValid && contentIsValid) {
      document.body.style = "overflow: hidden";
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style = "overflow: auto";
  };

  const showOtc = () => {
    if (isOpening) {
      setIsOpening(false);
      document.querySelector(".drugSelectBtn").innerHTML =
        "제공 otc 선택하기 ∨";
    } else {
      setIsOpening(true);
      document.querySelector(".drugSelectBtn").innerHTML =
        "제공 otc 선택하기 ∧";
    }
  };

  const handleMultipleActions = (event, drugIndex) => {
    handleActive(drugIndex);
    handleDropdownChange(event, drugIndex);
  };

  const handleActive = (drugIndex) => {
    const index = activeIndex.indexOf(drugIndex);
    if (index !== -1) {
      setActiveIndex(activeIndex.filter((index) => index !== drugIndex));
      setSelectDrugs(
        selectDrugs.filter((drug) => drug.drugIndex !== drugIndex)
      );
    } else {
      setActiveIndex([...activeIndex, drugIndex]);
    }
  };

  const handleDropdownChange = (event, drugIndex) => {
    const selectedDrugName = event.target.dataset.drugname;
    if (selectedDrugName) {
      const findDrug = drugData.find(
        (drug) => drug.drugName === selectedDrugName
      );
      if (findDrug) {
        const isDuplicate = selectDrugs.some(
          (existingDrug) => existingDrug.drugName === selectedDrugName
        );
        if (!isDuplicate) {
          findDrug.drugIndex = drugIndex;
          setSelectDrugs((prevDrugs) => [...prevDrugs, findDrug]);
        }
      }
    }
  };

  const handleInputChange = (index, key, value) => {
    const intValue = parseInt(value, 10);

    setSelectDrugs((prevSelectDrugs) => {
      const updatedDrugs = [...prevSelectDrugs];
      updatedDrugs[index] = { ...updatedDrugs[index], usedAmount: intValue };
      return updatedDrugs;
    });
  };

  const removeDrug = (drug, index) => {
    setSelectDrugs((prevDrugs) => {
      const updateDrugs = [...prevDrugs];
      updateDrugs.splice(index, 1);
      return updateDrugs;
    });
    const drugIndex = drug.drugIndex;
    setActiveIndex(activeIndex.filter((index) => index !== drugIndex));
  };

  const dropwonStyle = {
    width: "9.4375rem",
    height: "1.4375rem",
    border: "1px solid #000",
    outline: "none",
    fontSize: "0.9375rem",
    borderRadius: "0.625rem",
    backgroundColor: "white",
    cursor: "pointer",
    padding: "0",
    fontWeight: "bold",
  };

  const wrongInputStyle = {
    color: "#FF4949",
    fontSize: "0.625rem",
    margin: "0.31rem 0 0 0.56rem",
    display: "none",
  };

  if (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      alert("접근 권한이 없습니다");
      navigate(-1);
    }
    return;
  }

  return (
    <div>
      <div className="addCounseling-wrapper">
        <div className="counselTitle-wrapper">
          <p className="counselName">
            {patientName} <span className="counselTitle">님 상담추가</span>
          </p>
        </div>
        <div className="counsel-wrapper">
          <div className="counsel-category-wrapper">
            <p> 상담일자 </p>
          </div>
          <div
            className="counsel-content-wrapper"
            style={{ marginBottom: "0.87rem" }}
          >
            <p> {today} </p>
          </div>
          <div className="counsel-category-wrapper">
            <p> 상담자 </p>
          </div>
          <div className="wrong-include-content-wrapper">
            <div className="counselPro-content-wrapper">
              <input
                type="text"
                value={data[0]}
                onChange={(e) => handleChange(0, e)}
                ref={(el) => (inputRefs.current[0] = el)}
              />
            </div>
            <p className="wrongProvider" style={wrongInputStyle}>
              ※ 상담자를 입력하세요.
            </p>
          </div>
          <div className="counselOtc-content-wrapper">
            <div className="drugDropdown-wrapper">
              <button
                className="drugSelectBtn"
                style={dropwonStyle}
                onClick={showOtc}
              >
                제공 otc 선택하기 ∧
              </button>
              <div className="drugOption-wrapper">
                {isOpening &&
                  drugData.map((drug, drugIndex) => (
                    <p
                      className={
                        activeIndex.includes(drugIndex)
                          ? "drugOption-active"
                          : "drugOption"
                      }
                      key={drug.id}
                      data-drugname={drug.drugName}
                      onClick={(event) =>
                        handleMultipleActions(event, drugIndex)
                      }
                    >
                      {drug.drugName}
                    </p>
                  ))}
              </div>
            </div>
            {selectDrugs.length > 0 ? (
              <div className="selectDrugs-wrapper">
                {selectDrugs.map((drug, index) => (
                  <div className="selectDrugs-content" key={drug.id}>
                    <p className="selectDrugsName">{drug.drugName}</p>
                    <input
                      type="text"
                      onChange={(e) =>
                        handleInputChange(index, drug.id, e.target.value)
                      }
                    />
                    <p style={{ margin: "0 0.38rem 0 0.31rem" }}>개</p>
                    <p className="selectDrugsAmount">
                      재고 : {drug.totalUsableAmount} 개
                    </p>
                    <button onClick={() => removeDrug(drug, index)}>X</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="selectedDrugs-wrapper"></div>
            )}
            <p className="wrongInput" style={wrongInputStyle}>
              ※ 잘못된 입력입니다.
            </p>
          </div>
          <div className="counsel-category-wrapper">
            <p> 상담내용 </p>
          </div>
          <div className="wrong-include-content-wrapper">
            <div className="counsel-content-wrapper">
              <textarea
                className="counselTextarea"
                value={data[1]}
                onChange={(e) => handleChange(1, e)}
                onKeyDown={autoResizeTextarea}
                onKeyUp={autoResizeTextarea}
              ></textarea>
            </div>
            <p className="wrongContent" style={wrongInputStyle}>
              ※ 상담내용을 입력하세요.
            </p>
          </div>
        </div>
        <div>
          <div className="counsel-btn-wrapper">
            <button onClick={openModal}> 저장 </button>
            <Modal className="addCounsel-modal" isOpen={isOpen}>
              <div className="addModal-wrapper">
                <div className="addModal-gr"> </div>
                <div className="addModal-content-wrapper">
                  <p> 저장하시겠습니까? </p>
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
                  state: { id: patientId },
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
