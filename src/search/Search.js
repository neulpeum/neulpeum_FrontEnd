import React from "react";

export default function Search({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event.target.elements.filter.value);
  };
  return (
    <form onSubmit={handleSubmit} className="searchForm">
      <input className="searchBar" name="filter"></input>
      <button className="searchBtn">
        <img src="/icons/ic_counSearch.svg" alt="검색" className="search-img" />
      </button>
    </form>
  );
}
