import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Otc.css";

export default function AddCounseling() {
  Modal.setAppElement("#root");

  const inputRefs = useRef([]);
  const [data, setData] = useState([""]);
  const [drugData, setDrugData] = useState([]);
  const [selectDrugs, setSelectDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState("");

  const location = useLocation();
  const patientId = location.state.patientId;
  const patientName = location.state.patientName;
  // const tempProviderName = "박서연";
  // const providerName = tempProviderName;

  useEffect(() => {
    getData();
    const firstInput = inputRefs.current[0];
    if (firstInput) {
      const length = firstInput.value.length;
      firstInput.setSelectionRange(length, length);
      firstInput.focus();
    }
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://52.78.35.193:8080/api/patient/drug"
      );
      const drugDataWithId = response.data.map((drug, index) => ({
        ...drug,
        id: index,
      }));
      setDrugData(drugDataWithId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const date = new Date();
  const today = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
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
    const drugNames = selectDrugs.map((drug) => drug.drugName).join(", ");

    const consultData = {
      patientId: `${patientId}`,
      // providerName: `${providerName}`,
      providerName: data[0],
      takingDrug: `${drugNames}`,
      consultContent: data[1],
    };

    // console.log(consultData);
    const takingDrugData = selectDrugs.map((item) => {
      return {
        drugName: item.drugName,
        usedAmount: item.usedAmount,
      };
    });

    axios
      .post("http://52.78.35.193:8080/api/patient/consult", consultData)
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .patch("http://52.78.35.193:8080/api/patient/drug", takingDrugData)
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    document.body.style = "overflow: auto";
    navigate("/citizensDetails", {
      state: { id: patientId, isButtonClicked: true },
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

  const handleDropdownChange = (event) => {
    const selectedDrugName = event.target.value;
    setSelectedDrug(selectedDrugName);
    if (selectedDrugName) {
      const findDrug = drugData.find(
        (drug) => drug.drugName === selectedDrugName
      );
      if (findDrug) {
        const isDuplicate = selectDrugs.some(
          (existingDrug) => existingDrug.drugName === selectedDrugName
        );
        if (!isDuplicate) {
          setSelectDrugs((prevDrugs) => [...prevDrugs, findDrug]);
        }
      }
    }
    setSelectedDrug("");
  };

  const handleInputChange = (index, key, value) => {
    const intValue = parseInt(value, 10);

    setSelectDrugs((prevSelectDrugs) => {
      const updatedDrugs = [...prevSelectDrugs];
      updatedDrugs[index] = { ...updatedDrugs[index], usedAmount: intValue };
      return updatedDrugs;
    });
  };

  const removeDrug = (index) => {
    setSelectDrugs((prevDrugs) => {
      const updateDrugs = [...prevDrugs];
      updateDrugs.splice(index, 1);
      return updateDrugs;
    });
  };

  const dropwonStyle = {
    width: "6.1875rem",
    height: "1.4375rem",
    paddingLeft: "0.37rem",
    paddingTop: "0.2rem",
    border: "1px solid #000",
    outline: "none",
    fontSize: "0.9375rem",
  };

  const wrongInputStyle = {
    color: "#FF4949",
    fontSize: "0.625rem",
    margin: "0.31rem 0 0 0.56rem",
    display: "none",
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
              {/* <p>{tempProviderName}</p> */}
            </div>
            <p className="wrongProvider" style={wrongInputStyle}>
              ※ 상담자를 입력하세요.
            </p>
          </div>
          <div className="counsel-category-wrapper">
            <p> 제공 otc </p>
          </div>
          <div className="counselOtc-content-wrapper">
            <div className="drugDropdown-wrapper">
              <select
                value={selectedDrug || ""}
                onChange={(event) => handleDropdownChange(event)}
                style={dropwonStyle}
              >
                <option value="">제공otc</option>
                {drugData.map((drug, drugIndex) => (
                  <option key={drug.id} value={drug.drugName}>
                    {drug.drugName}
                  </option>
                ))}
              </select>
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
                    <button onClick={() => removeDrug(index)}>X</button>
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
