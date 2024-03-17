import React, { useState } from "react";
import "./Criteria.css";

export default function Search({ onSubmit }) {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

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
      <input
        className="searchBar"
        name="filter"
        value={searchKeyword}
        onChange={handleKeywordChange}
      ></input>
      <button type="submit" className="searchBtn">
        <img src="/icons/ic_counSearch.svg" alt="검색" className="search-img" />
      </button>
    </form>
  );
}
