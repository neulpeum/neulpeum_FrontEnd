import React, { useState } from "react";
import styled from "styled-components";
import "styles/ForComps/SearchBar.css";

const SearchBarContainer = styled.div`
  ${(props) =>
    props.$using === "drugs"
      ? `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 14.5%;
    `
      : `
    display: flex;
    flex-direction: row;
    width: ${window.innerWidth <= 768 ? '80%' : '77.8vw'};
    height: 5.47vh;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: ${window.innerWidth <= 768 ? '22px' : '6.5vh'} auto 0 auto;
    `}
`;

const SearchInputContainer = styled.div`
  ${(props) =>
    props.$using === "drugs"
      ? `
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      gap: 13px;
      `
      : `
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 20px;
      margin: 0;
    `}
`;

const SearchInput = styled.input`
  ${(props) =>
    props.$using === "drugs"
      ? `
      width: 100%;
      height: 100%;
      font-size: clamp(1rem, 1.5vw, 18px);
      border: 2px solid #aed391;
      border-radius: 1.25rem;
      padding-left: 1.875vw;
    `
      : `
      width: 100%;
      height: 100%;
      border: 1px solid white;
      padding-left: 12px;
      border: 2px solid #aed391;
      border-radius: 1.25rem;
      font-size: clamp(0.85rem, 1.5vw, 18px);
    `}
`;

const SearchIcon = styled.img`
  ${(props) =>
    props.$using === "drugs"
      ? `
      width: 60%;
      height: 60%;
    `
      : `
      width: 60%;
      height: 60%;

    `}
`;

const PlusIcon = styled.img`
  width: 70%;
  height: 70%;
`;

const SearchBar = ({ search, currentPage, onCitizenAddClick, onSubmit }) => {
  const [keyword, setKeyword] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("전체");

  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const activeEnter = (e, searchType) => {
    if (e.key === "Enter") {
      search(keyword, searchCriteria);
    }
  };

  const pageConfig = {
    Drugs: {
      content: (
        <SearchBarContainer $using="drugs">
          <select className="criteriaStyle" value={searchCriteria} onChange={handleCriteriaChange}>
            <option value="">전체</option>
            <option value="drugName">약 이름</option>
            <option value="expireDate">유통기한</option>
            <option value="drugEnrollTime">등록일자</option>
            <option value="drugModifiedTime">마지막 사용 일자</option>
          </select>
          <SearchInputContainer $using="drugs">
            <SearchInput
              id="drugs_search_value"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              type="text"
              placeholder="검색할 내용을 입력하세요."
              onKeyDown={(e) => activeEnter(e, "drugs")}
              $using="drugs"
              name="searchInput"
            />
            <div className="icon-wrapper">
              <SearchIcon
                onClick={() => search(keyword, searchCriteria)}
                $using="drugs"
                src="/icons/ic_counSearch.svg"
                alt="검색"
              />
            </div>
          </SearchInputContainer>
        </SearchBarContainer>
      ),
    },
    Citizens: {
      content: (
        <SearchBarContainer>
          {/* <select className="citizen-criteriaStyle" value={searchCriteria} onChange={handleCriteriaChange}>
            <option value="전체">전체</option>
            <option value="name">이름</option>
            <option value="address">주소</option>
          </select> */}
          <SearchInputContainer>
            <SearchInput
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              type="text"
              placeholder="검색할 내용을 입력하세요."
              onKeyDown={(e) => activeEnter(e, "citizens")}
            />
            <div className="icon-wrapper">
              <SearchIcon
                onClick={() => search(keyword, searchCriteria)}
                src="/icons/ic_counSearch.svg"
                alt="검색"
              />
            </div>
          </SearchInputContainer>
          <div className="icon-wrapper" id="plusIcon-wrapper">
            <PlusIcon
              src="/icons/ic_plus.svg"
              alt="주민 추가"
              onClick={onCitizenAddClick}
            />
          </div>
        </SearchBarContainer>
      ),
    },
  };

  const currentPageConfig = pageConfig[currentPage];

  return <>{currentPageConfig.content}</>;
};

export default SearchBar;
