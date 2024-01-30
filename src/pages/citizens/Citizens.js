import React from 'react';
import SearchBar from '../../components/searchbar/SearchBar';
import CitizenList from '../../components/citizenList/CitizenList';
import HeaderComponent from '../../components/header/Header';

const Citizens = () => {
  const columns = [
    { Header: '번호', accessor: 'number' },
    { Header: '이름', accessor: 'name' },
    { Header: '주소', accessor: 'address' },
    { Header: '병력', accessor: 'caseHistory' },
    { Header: '복용중인 약', accessor: 'medication' },
    { Header: '특이사항', accessor: 'note' },
    { Header: '', accessor: 'action', Cell: () => '조회' },
  ];

  const data = [
    { number: 1, name: '홍길동', address: '서울특별시 종로구 @@', caseHistory: 'No', medication: '아스피린', note: 'None' },
    // TODO(데이터 로드해서 동적으로 CitizenList에 전달하기)
  ];

  return (
    <div>
      <HeaderComponent/>
      <SearchBar/>
      <CitizenList columns={columns} data={data} />
    </div>
  );
};

export default Citizens;