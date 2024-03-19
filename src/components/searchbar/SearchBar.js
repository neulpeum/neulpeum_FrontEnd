import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  ${(props) =>
    props.using === 'drugs'
    ? `
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
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
    props.using === 'drugs'
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
    props.using === 'drugs'
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
    props.using === 'drugs'
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

const SortIcon = styled.img`
  padding: 5px;
  cursor: pointer;
`;

const PlusIcon = styled.img`
  border: 1px solid black;
  padding: 8px;
  margin-left: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchBar = ({ sort, search, currentPage, isReversed, onCitizenAddClick}) => {
  const [keyword, setKeyword] = useState('');
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      search(keyword);
    }
  }

  // 각 페이지 마다 달라지는 컴포넌트 구성 Drugs, Citizens
  const pageConfig = {
    Drugs: {
      content: (
      <SearchBarContainer using='drugs'>
        <SearchInputContainer using='drugs'>
          <SearchInput value={keyword} onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={(e) => activeEnter(e)}
          using='drugs' name='searchInput' type="text" placeholder='검색할 약 이름을 입력하세요.' />
          <SearchIcon onClick={() => search(keyword)} using='drugs' src="/icons/ic_counSearch.svg" alt="검색" />
        </SearchInputContainer>
      </SearchBarContainer>
      ),
    },
    Citizens: {
      content: (
      <SearchBarContainer>
        <SearchInputContainer>
          <SearchInput value={keyword} onChange={(event) => setKeyword(event.target.value)} type="text" placeholder='검색할 주민의 이름을 입력하세요.' onKeyDown={(e) => activeEnter(e)} />
          <SearchIcon onClick={() => search(keyword)} src="/icons/ic_counSearch.svg" alt="검색" />
        </SearchInputContainer>
  
        <PlusIcon src="/icons/ic_plus.svg" alt="주민 추가" onClick={onCitizenAddClick} />
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