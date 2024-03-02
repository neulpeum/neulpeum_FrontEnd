import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ConsultModal from "../consultModal/ConsultModal";

export default function CitizenCounselList() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [consultId, setConsultId] = useState("0");
  const tempPatientId = 1;

  useEffect(() => {
    getName();
    getData();
  });

  const getName = async () => {
    let tempPatientId = 1;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/patientInfo?patientId=${tempPatientId}`
      );
      setName(response.data.patientName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getData = async () => {
    let tempPatientId = 1;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/patient/consult?patientId=${tempPatientId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = (btnConsultId) => {
    setConsultId(btnConsultId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="citizenCounselList-wrapper">
      <div className="counselList-wrapper">
        <div className="ment-wrapper">
          <p className="citizenName">{name}</p>
          <p className="citizensCounList">님의 상담 리스트</p>
        </div>
        <div className="searchBar-wrapper">
          <input
            type="text"
            className="searchBar"
            value={value}
            onChange={handleChange}
          ></input>
          <img
            src="/icons/ic_counSearch.svg"
            alt="검색"
            className="search-img"
          />
          <img src="/icons/ic_counSort.svg" alt="정렬" className="sort-img" />
          <Link to="/addcounsel" state={{ patientId: `${tempPatientId}` }}>
            <img
              src="/icons/ic_counselWrite.svg"
              alt="추가"
              className="write-img"
            />
          </Link>
        </div>
        <div className="list-wrapper">
          <table className="counselTable">
            <thead>
              <tr>
                <th>번호</th>
                <th>상담자(대학생)</th>
                <th>제공 otc</th>
                <th>방문날짜</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.providerName}</td>
                    <td>{item.takingDrug}</td>
                    <td>{item.consultDate}</td>
                    <td>
                      <button
                        className="inquiry-btn"
                        onClick={() => openModal(item.consultId)}
                      >
                        조회 &gt;
                      </button>
                      {isOpen && consultId === item.consultId && (
                        <ConsultModal
                          onClose={closeModal}
                          consultId={consultId}
                        />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
