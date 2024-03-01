import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import "./Modal.css";

export default function CitizenCounselList() {
  const data = [];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/patient/consult?patientId=1"
      );
      response.data.forEach((item) => {
        data.push(item);
      });
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="citizenCounselList-wrapper">
      <div className="counselList-wrapper">
        <div className="ment-wrapper">
          <p className="citizenName">홍xx</p>
          <p className="citizensCounList">님의 상담 리스트</p>
        </div>
        <div className="searchBar-wrapper">
          <input
            type="text"
            // placeholder="해야 할 일을 입력하세요."
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
          <Link to="/addcounsel">
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
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.col1}</td>
                  <td>{item.col2}</td>
                  <td>{item.col3}</td>
                  <td>{item.col4}</td>
                  <td>
                    <button className="inquiry-btn" onClick={openModal}>
                      조회 &gt;
                    </button>
                    <Modal
                      className="counsel-modal"
                      isOpen={isOpen}
                      onRequestClose={closeModal}
                    >
                      <div className="modal-warpper">
                        <div className="modal-content-wrapper">
                          <div className="modal-title">
                            <p className="m-name">김@@ </p>
                            <p>님이</p>
                            <p className="m-date">2024.01.10 (수) </p>
                            <p>에</p>
                            <br></br>
                            <p>상담한 내용입니다.</p>
                          </div>
                          <div className="modal-content">
                            <div className="modal-otc">
                              <p className="m-otc">제공OTC: 진통제</p>
                            </div>
                            <div className="modal-counsel">
                              <p>두통이 있으시다고 하셔서 진통제를 드림.</p>
                              <br></br>

                              <p>기존에 먹언 약의 개수를 3개에서 2개로 줄임.</p>
                            </div>
                          </div>
                          <div className="modal-btn-warpper">
                            <button onClick={closeModal}>확인</button>
                            <button>수정</button>
                          </div>
                        </div>
                      </div>
                    </Modal>
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
