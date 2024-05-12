import React, { useState } from "react";
import styled from "styled-components";
import "styles/ForComps/SearchBar.css";

const SearchBarContainer = styled.div`
  ${(props) =>
    props.$using === "drugs"
      ? `
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 14.5%;
    `
      : `
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 36px;
    `}
`;

const SearchInputContainer = styled.div`
  ${(props) =>
    props.$using === "drugs"
      ? `
      display: flex;
      align-items: center;
      width: 100%;
      height: 42.75%;
      `
      : `
      width: 85%;
      height: 4.125rem;
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
      font-size: 1.3vw;
      border: 2px solid #aed391;
      border-radius: 1.25rem;
      padding-left: 12px;
    `
      : `
      width: 100%;
      height: 100%
      border: 1px solid white;
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 12px;
      font-size: 16px;
      border: 2px solid #aed391;
      border-radius: 1.25rem;
    `}
`;

const SearchIcon = styled.img`
  ${(props) =>
    props.$using === "drugs"
      ? `
      width: auto;
      height: 100%;
      cursor: pointer;
      margin-left:4px;
      background: linear-gradient( 270deg, #aed391 -1.77%, #a9d3a1 20.55%, #a5d2ab 35.26%, #a2d2b3 46.42%, #9dd2c1 65.69%, #99d1cc 94.6%, #95d1d9 99.67%);
      border-radius: 50%;
      padding: 9px;
    `
      : `
      width: auto;
      height: 100%;
      padding: 12px;
      cursor: pointer;
      background: linear-gradient( 270deg, #aed391 -1.77%, #a9d3a1 20.55%, #a5d2ab 35.26%, #a2d2b3 46.42%, #9dd2c1 65.69%, #99d1cc 94.6%, #95d1d9 99.67%);
      border-radius: 50%;
    `}
`;

const PlusIcon = styled.img`
  width: 4.125rem;
  height: 4.125rem;
  padding: 10px;
  margin-left: 20px;
  background: linear-gradient(
    270deg,
    #aed391 -1.77%,
    #a9d3a1 20.55%,
    #a5d2ab 35.26%,
    #a2d2b3 46.42%,
    #9dd2c1 65.69%,
    #99d1cc 94.6%,
    #95d1d9 99.67%
  );
  border-radius: 50%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchBar = ({ search, currentPage, onCitizenAddClick, onSubmit }) => {
  const [keyword, setKeyword] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("");

  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const activeEnter = (e, searchType) => {
    if (e.key === "Enter") {
      if (searchType === "drugs") {
        search(keyword, searchCriteria);
      } else {
        search(keyword);
      }
    }
  };

  const pageConfig = {
    Drugs: {
      content: (
        <SearchBarContainer $using="drugs">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "42.75%",
              width: "100%",
            }}
          >
            <select
              value={searchCriteria}
              onChange={handleCriteriaChange}
              className="criteriaStyle"
            >
              <option value="">전체</option>
              <option value="drugName">약 이름</option>
              <option value="expireDate">유통기한</option>
              <option value="drugEnrollTime">등록일자</option>
              <option value="drugModifiedTime">마지막 사용 일자</option>
            </select>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "25%",
                height: "100%",
                gap: "8px",
                marginLeft: "20px",
              }}
            >
              <div className="gray-circle" />
              <span
                style={{
                  fontSize: "1.3vw",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                추가된 행
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "25%",
                height: "100%",
                gap: "8px",
                marginLeft: "20px",
              }}
            >
              <div className="blue-circle" />
              <span
                style={{
                  fontSize: "1.3vw",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                수정된 행
              </span>
            </div>
          </div>
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
            <SearchIcon
              onClick={() => search(keyword, searchCriteria)}
              $using="drugs"
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
