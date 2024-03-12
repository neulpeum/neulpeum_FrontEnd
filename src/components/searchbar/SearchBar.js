import React, { useState } from 'react';
import styled from 'styled-components';

//SearchBar 컴포넌트는 Citizens 와 Drugs 페이지, 2개에 포함됨
const SearchBarContainer = styled.div`
  ${(props) =>
    props.using === 'drugs'
    ? `
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    top: 0;
    left: 0;

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
    `}
   
`;

const SortContainer = styled.div`
  ${(props) =>
    props.using === 'drugs'
    ? `
    display: flex;
    flex-direction: row;
    width: 52%;
    height: 56px;
    border: 1px solid black;
    `
    : `
    width: fit-content;
    height: 56px;
    margin: 0 0 0 20px;
    display: flex;
    align-items: center;
    gap: 5px;
    border: 1px solid black;
    `}
`;

const SortContainerTag = styled.p`
  ${(props) =>
    props.using === 'drugs'
    ? `
    flex: 1;
    font-size: 20px;
    text-align: center;
    transform: translate(0, -50%);
    `
    : `
    margin: 0;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-right: 1px solid black;
    `}
`;

const SearchIcon = styled.img`
  ${(props) =>
    props.using === 'drugs'
    ? `
    width: 55px;
    height: 55px;
    cursor: pointer;
    border-left: 1px solid black;
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
    width: 52px;
    height: 56px;
    padding: 0 2px;
    border-left: 1px solid black;
    cursor: pointer;
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

const SearchBar = ({ sort, search, currentPage, isReversed, createBtn, onCitizenAddClick}) => {
  const [keyword, setKeyword] = useState('');

  // 각 페이지 마다 달라지는 컴포넌트 구성 Drugs, Citizens
  const pageConfig = {
    Drugs: {
      content: (
      <SearchBarContainer using='drugs'>
        <SearchInputContainer using='drugs'>
          <SearchInput value={keyword} onChange={(event) => setKeyword(event.target.value)}
          using='drugs' name='searchInput' type="text" placeholder='검색할 약 이름을 입력하세요.' />
          <SearchIcon onClick={() => search(keyword)} using='drugs' src="/icons/ic_drugSearch.svg" alt="검색" />
        </SearchInputContainer>
        <div style={{display:'flex', flexDirection: 'row', gap: '1rem'}}>
          <SortContainer using='drugs'>
            <SortContainerTag using='drugs'>정렬 기준</SortContainerTag>
            <SortIcon using='drugs' src="/icons/ic_sort.svg" alt="정렬" />
          </SortContainer>
          {createBtn}
        </div>
        
      </SearchBarContainer>
      ),
    },
    Citizens: {
      content: (
      <SearchBarContainer>
        <SearchInputContainer>
          <SearchInput value={keyword} onChange={(event) => setKeyword(event.target.value)} type="text" placeholder='검색할 주민의 이름을 입력하세요.' />
          <SearchIcon onClick={() => search(keyword)} src="/icons/ic_search.svg" alt="검색" />
        </SearchInputContainer>
        <SortContainer>
          <SortContainerTag>
            {isReversed ? '정방향 정렬' : '역방향 정렬'}
          </SortContainerTag>
          <SortIcon onClick={() => sort()} src="/icons/ic_sort.svg" alt="정렬" />
        </SortContainer>
  
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