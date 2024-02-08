import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  flex: ${(props) => props.isFlex};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
`;

const SearchInputContainer = styled.div`
  //width: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid black;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid white;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 12px;
`;

const SortContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid black;
  margin-left: 20px;
`;

const SortContainerTag = styled.p`
  margin: 0;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-right: 1px solid black;
`;
const SearchIcon = styled.img`
  border-left: 1px solid black;
  padding: 5px;
  cursor: pointer;
`;

const SortIcon = styled.img`
  padding: 5px;
  cursor: pointer;
`;

const PlusIcon = styled.img`
  border: 1px solid black;
  padding: 12px;
  margin-left: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const UnderContainer = styled.div`
  display:flex;
  flex-directon: row;
  aling-items: center;
  
`;
const SearchBar = ({currentPage}) => {
  // 각 페이지 마다 달라지는 컴포넌트 구성 Drugs, Citizens
  const pageConfig = {
    Drugs: {
      content: (
      <SearchBarContainer flexDirection='column' isFlex={1}>
        <SearchInputContainer>
          <SearchInput type="text" placeholder='검색할 약 이름을 입력하세요.' />
          <SearchIcon src="/icons/ic_search.svg" alt="검색" />
        </SearchInputContainer>
        <div className='under'>
          <SortContainer>
            <SortContainerTag>정렬 기준</SortContainerTag>
            <SortIcon src="/icons/ic_sort.svg" alt="정렬" />
          </SortContainer>
        </div>
        {/* <SortContainer>
          <SortContainerTag>정렬 기준</SortContainerTag>
          <SortIcon src="/icons/ic_sort.svg" alt="정렬" />
        </SortContainer> */}
      </SearchBarContainer>
      ),
    },
    Citizens: {
      content: (
      <SearchBarContainer flexDirection='row'>
        <SearchInputContainer>
          <SearchInput type="text" placeholder='검색할 주민의 이름을 입력하세요.' />
          <SearchIcon src="/icons/ic_search.svg" alt="검색" />
        </SearchInputContainer>
  
        <SortContainer>
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