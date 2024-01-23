import React from 'react';
import sort from './ic_sort.svg';
import plus from './ic_plus.svg';
import search from './ic_search.svg';
import './SearchBar.css'; // 스타일링을 위한 CSS 파일

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <div className="search-input-container">
        <input type="text" placeholder="검색할 주민의 이름을 입력하세요."/>
        <img src={search} className="search-icon"/>
      </div>

      <div className="sort-container">
        <p>역방향 정렬</p>
        <img src={sort} className="sort-icon"/>
      </div>

      <img src={plus} className="plus-icon"/>
    </div>
  );
};

export default SearchBar;