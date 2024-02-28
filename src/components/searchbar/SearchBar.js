import React, { useState } from 'react';
import styled from 'styled-components';

//SearchBar 컴포넌트는 Citizens 와 Drugs 페이지, 2개에 포함됨
//아래는 각각의 페이지에 적합한 스타일시트임
const SearchBarContainer = styled.div`
  ${(props) =>
    props.using === 'drugs'
    ? `
    width: 503px;
    height: 131px;
    position: absolute;
    top: 283px;
    left: 788px;
    `
    : `
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
    `}
`;

const SearchInputContainer = styled.div`
  ${(props) =>
    props.using === 'drugs'
    ? `
    width: 100%;
    height: 56px;
    border: 1px solid black;
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 5px;
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
    props.using === 'drugs'
    ? `
    width: 438px;
    height: 46px;
    border: 1px solid white;
    font-size: 20px;
    `
    : `
    width: 100%;
    border: 1px solid white;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 12px;
    `}
   
`;

const SortContainer = styled.div`
  ${(props) =>
    props.using === 'drugs'
    ? `
    width: 240px;
    height: 56px;
    position: absolute;
    top: 77px;
    left: 0px;
    border: 1px solid black;
    `
    : `
    width: fit-content;
    height: fit-content;
    margin: 0 0 0 20px;
    display: flex;
    align-items: center;
    gap: 5px;
    border: 1px solid black;
    `}
`;

const SortContainerTag = styled.p`
  margin: 0;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-right: 1px solid black;
`;

const SortContainerTag2 = styled.span`
  position: absolute;
  top: 16px;
  left: 35px;
  font-size: 20px;
`

const SearchIcon = styled.img`
  ${(props) =>
    props.using === 'drugs'
    ? `
    position: absolute;
    top: 0;
    right: 0;
    width: 55px;
    height: 55px;
    border-left: 1px solid black;
    padding: 0 5px;
    cursor: pointer;
    `
    : `
    border-left: 1px solid black;
    padding: 5px;
    cursor: pointer;
    `}
  
`;

const SortIcon = styled.img`
  ${(props) =>
    props.using === 'drugs'
    ? `
    position: absolute;
    right: 0px;
    top: 0px;
    width: 55px;
    height: 55px;
    cursor: pointer;
    border-left: 1px solid black;
    padding: 0 5px;
    `
    : `
      padding: 5px;
      cursor: pointer;
    `}
`;

const PlusIcon = styled.img`
  border: 1px solid black;
  padding: 12px;
  margin-left: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;


const SearchBar = ({ sort, search, currentPage, isReversed}) => {
  const [keyword, setKeyword] = useState('');

  // 각 페이지 마다 달라지는 컴포넌트 구성 Drugs, Citizens
  const pageConfig = {
    Drugs: {
      content: (
      <SearchBarContainer using='drugs'>
        <SearchInputContainer using='drugs'>
          <SearchInput using='drugs' name='searchInput' type="text" placeholder='검색할 약 이름을 입력하세요.' />
          <SearchIcon using='drugs' src="/icons/ic_drugSearch.svg" alt="검색" />
        </SearchInputContainer>
        <SortContainer using='drugs'>
          <SortContainerTag2>정렬 기준</SortContainerTag2>
          <SortIcon using='drugs' src="/icons/ic_sort.svg" alt="정렬" />
        </SortContainer>
      </SearchBarContainer>
      ),
    },
    Citizens: {
      content: (
      <SearchBarContainer using='citizens'>
        <SearchInputContainer using='citizens'>
          <SearchInput value={keyword} onChange={(event) => setKeyword(event.target.value)} type="text" placeholder='검색할 주민의 이름을 입력하세요.' />
          <SearchIcon onClick={() => search(keyword)} src="/icons/ic_search.svg" alt="검색" />
        </SearchInputContainer>
        <SortContainer using='citizens'>
          <SortContainerTag>역방향 정렬</SortContainerTag>
          <SortIcon src="/icons/ic_sort.svg" alt="정렬" />
        </SortContainer>
  
        <PlusIcon src="/icons/ic_plus.svg" alt="주민 추가" />
      </SearchBarContainer>
      )
    },
  };

  const currentPageConfig = pageConfig[currentPage];

  return (
    <>
      {currentPageConfig.content}
    </>
  );
};

export default SearchBar;