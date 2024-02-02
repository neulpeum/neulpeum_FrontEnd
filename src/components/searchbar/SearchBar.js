import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <div className="search-input-container">
        <input type="text" placeholder="검색할 주민의 이름을 입력하세요."/>
        <img src="/icons/ic_search.svg" className="search-icon" alt="검색"/>
      </div>

      <div className="sort-container">
        <p>역방향 정렬</p>
        <img src="/icons/ic_sort.svg" className="sort-icon" alt="정렬"/>
      </div>

      <img src="/icons/ic_plus.svg" className="plus-icon" alt="주민 추가"/>
    </div>
  );
};

export default SearchBar;