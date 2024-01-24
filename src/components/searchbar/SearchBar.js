import React from 'react';
import sort from './ic_sort.svg';
import plus from './ic_plus.svg';
import search from './ic_search.svg';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <div className="search-input-container">
        <input type="text" placeholder="검색할 주민의 이름을 입력하세요."/>
        <img src={search} className="search-icon" alt="검색"/>
      </div>

      <div className="sort-container">
        <p>역방향 정렬</p>
        <img src={sort} className="sort-icon" alt="정렬"/>
      </div>

      <img src={plus} className="plus-icon" alt="주민 추가"/>
    </div>
  );
};

export default SearchBar;