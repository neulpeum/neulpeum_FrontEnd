import React, { useState } from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  ${(props) =>
    props.using === "drugs"
      ? `
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    `
      : `
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 36px;
    `}
`;

const SearchInputContainer = styled.div`
  ${(props) =>
    props.using === "drugs"
      ? `
      display: flex;
      width: 100%;
      height: fit-content;
      border: 1px solid black;
      `
      : `
    width: 50%;
    display: flex;
    align-items: center;
    gap: 5px;
    border: 1px solid black;
    margin: 0;
    `}
`;

const SearchInput = styled.input`
  ${(props) =>
    props.using === "drugs"
      ? `
    width: 100%;
    min-height: 56px;
    border: 1px solid white;
    font-size: 20px;
    padding: 10px;
    `
      : `
    width: 100%;
    border: 1px solid white;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 12px;
    font-size: 16px;
    `}
`;

const SearchIcon = styled.img`
  ${(props) =>
    props.using === "drugs"
      ? `
    padding: 5px;
    cursor: pointer;
    margin-right:4px;
    `
      : `
    padding: 5px;
    cursor: pointer;
    margin-right:4px;
    `}
`;

const PlusIcon = styled.img`
  border: 1px solid black;
  padding: 8px;
  margin-left: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const criteriaStyle = {
  width: "11rem",
  height: "3.5rem",
  paddingLeft: "0.56rem",
  paddingTop: "0.2rem",
  fontSize: "1.25rem",
  border: "1px solid #000",
  outline: "none",
};

const SearchBar = ({ search, currentPage, onCitizenAddClick }) => {
  const [keyword, setKeyword] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("");

  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const activeEnter = (e, searchType) => {
    if (e.key === "Enter") {
      if (searchType == "drugs") {
        search(keyword, searchCriteria);
      } else {
        search(keyword);
      }
    }
  };
  // 각 페이지 마다 달라지는 컴포넌트 구성 Drugs, Citizens
  const pageConfig = {
    Drugs: {
      content: (
        <SearchBarContainer using="drugs">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <select
              value={searchCriteria}
              onChange={handleCriteriaChange}
              style={criteriaStyle}
            >
              <option value="">전체</option>
              <option value="drugName">약 이름</option>
              <option value="expireDate">유통기한</option>
              <option value="drugEnrollTime">입고 일자</option>
              <option value="drugModifiedTime">마지막 사용 일자</option>
            </select>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                gap: "8px",
                marginLeft: "20px",
              }}
            >
              <img src="/icons/ic_grey_circle.svg" alt="" />
              <span
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "20px",
                  overflow: "hidden",
                }}
              >
                추가된 행
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                gap: "8px",
                marginLeft: "20px",
              }}
            >
              <img src="/icons/ic_green_circle.svg" alt="" />
              <span
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "20px",
                  overflow: "hidden",
                }}
              >
                수정된 행
              </span>
            </div>
          </div>
          <SearchInputContainer using="drugs">
            <SearchInput
              id="drugs_search_value"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              type="text"
              placeholder="검색할 내용을 입력하세요."
              onKeyDown={(e) => activeEnter(e, "drugs")}
              using="drugs"
              name="searchInput"
            />
            <SearchIcon
              onClick={() => search(keyword, searchCriteria)}
              using="drugs"
              src="/icons/ic_counSearch.svg"
              alt="검색"
            />
          </SearchInputContainer>
        </SearchBarContainer>
      ),
    },
    Citizens: {
      content: (
        <SearchBarContainer>
          <SearchInputContainer>
            <SearchInput
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              type="text"
              placeholder="검색할 주민의 이름을 입력하세요."
              onKeyDown={(e) => activeEnter(e, "citizens")}
            />
            <SearchIcon
              onClick={() => search(keyword)}
              src="/icons/ic_counSearch.svg"
              alt="검색"
            />
          </SearchInputContainer>

          <PlusIcon
            src="/icons/ic_plus.svg"
            alt="주민 추가"
            onClick={onCitizenAddClick}
          />
        </SearchBarContainer>
      ),
    },
  };

  const currentPageConfig = pageConfig[currentPage];

  return <>{currentPageConfig.content}</>;
};

export default SearchBar;
