import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.using === 'drugs' ? 'column' : 'row')};
  width: ${(props) => (props.using === 'drugs' ? '50%' : '100%')};
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const SearchInputContainer = styled.div`
  width: ${(props) => (props.using === 'drugs' ? '100%' : '50%')};
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid black;
  margin: 0;
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
  margin: ${(props) => (props.using === 'drugs' ? 'auto' : '0 0 0 20px')};
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid black;
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

const SaveButton = styled.button`
  text-align: center;
  margin: auto;
  width: fit-contet;
  height: auto;
  padding: 1rem;
  border-left: 1px solid black;
  border-radius: 12px;
  color: white;
  background-color: #aed391;
  border: 0px;
  cursor: pointer;
`;


const SearchBar = ({ sort, currentPage, isReversed}) => {
  // 각 페이지 마다 달라지는 컴포넌트 구성 Drugs, Citizens
  const pageConfig = {
    Drugs: {
      content: (
      <SearchBarContainer using='drugs'>
        <SearchInputContainer using='drugs'>
          <SearchInput type="text" placeholder='검색할 약 이름을 입력하세요.' />
          <SearchIcon src="/icons/ic_search.svg" alt="검색" />
        </SearchInputContainer>
        <div className='under' style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent:'center'}} >
          <SortContainer using='drugs'>
            <SortContainerTag>정렬 기준</SortContainerTag>
            <SortIcon src="/icons/ic_sort.svg" alt="정렬" />
          </SortContainer>
          <SaveButton onClick={() => alert("저장 버튼 눌림")}>변경사항 저장</SaveButton>
        </div>
      </SearchBarContainer>
      ),
    },
    Citizens: {
      content: (
      <SearchBarContainer using='citizens'>
        <SearchInputContainer using='citizens'>
          <SearchInput type="text" placeholder='검색할 주민의 이름을 입력하세요.' />
          <SearchIcon src="/icons/ic_search.svg" alt="검색" />
        </SearchInputContainer>
        <SortContainer>
          <SortContainerTag>
            {isReversed ? '정방향 정렬' : '역방향 정렬'}
          </SortContainerTag>
          <SortIcon onClick={() => sort()} src="/icons/ic_sort.svg" alt="정렬" />
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