import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "styles/ForComps/Search.css";

export default function Search({ onSubmit }) {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  // const [isInputFocused, setInputFocused] = useState(false);
  const [name, setName] = useState("");
  const location = useLocation();
  const patientId = location.state.id;
  const navigate = useNavigate();

  useEffect(() => {
    const getName = async () => {
      try {
        const response = await axios.get(
          `/api/patientInfo?patientId=${patientId}`
        );
        setName(response.data.patientName);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          alert("접근 권한이 없습니다");
          navigate(-1);
          return;
        }
        console.error("Error fetching data:", error);
      }
    };
    getName();
  }, [navigate, patientId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchKeyword, searchCriteria);
  };

  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  // const handleInputFocus = () => {
  //   setInputFocused(true);
  // };

  // const handleInputBlur = () => {
  //   setInputFocused(false);
  // };

  return (
    <form onSubmit={handleSubmit} className="searchForm">
      <select
        className="coun-criteria"
        value={searchCriteria}
        onChange={handleCriteriaChange}
      >
        <option value="">전체</option>
        <option value="consultDate">방문날짜</option>
        <option value="providerName">상담자</option>
        <option value="takingDrug">제공 otc</option>
      </select>
      <div className="search-wrapper">
        <input
          className="searchBar"
          name="filter"
          value={searchKeyword}
          placeholder="검색할 내용을 입력하세요."
          onChange={handleKeywordChange}
          // onFocus={handleInputFocus}
          // onBlur={handleInputBlur}
        ></input>
        <button type="submit" className="searchBtn">
          <img
            src="/icons/ic_counSearch.svg"
            alt="검색"
            className="search-img"
          />
        </button>
        <Link
          to="/addcounsel"
          state={{
            patientId: `${patientId}`,
            patientName: `${name}`,
          }}
        >
          <div className="write-img">
            <img src="/icons/ic_counselWrite.svg" alt="추가" />
          </div>
        </Link>
      </div>
    </form>
  );
}
