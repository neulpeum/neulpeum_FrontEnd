import React, { useState } from 'react';
import { Link } from "react-router-dom";
import SearchBar from '../../components/searchbar/SearchBar';
import CitizenList from '../../components/citizenList/CitizenList';
import HeaderComponent from '../../components/header/Header';

const Citizens = () => {
  const [isReversed, setReverse] = useState(false);

  const originalData = [
    { number: 1, name: '홍길동', address: '서울특별시 종로구 @@', caseHistory: 'No', medication: '아스피린', note: 'None' },
    { number: 2, name: '김글로', address: '서울특별시 종로구 @@', caseHistory: 'No', medication: '아스피린', note: 'None' },
    { number: 3, name: '김홍탁', address: '서울특별시 종로구 @@', caseHistory: 'No', medication: '아스피린', note: 'None' },
  ];
  const [data, setData] = useState(originalData);

  function sortData() {
    setData(prevData => [...prevData].reverse());
    setReverse(!isReversed);
  };

  function search(keyword) {
    setData(() => [...originalData].filter((item) => item.name.includes(keyword)));
  }

  const columns = [
    { Header: '번호', accessor: 'number' },
    { Header: '이름', accessor: 'name' },
    { Header: '주소', accessor: 'address' },
    { Header: '병력', accessor: 'caseHistory' },
    { Header: '복용중인 약', accessor: 'medication' },
    { Header: '특이사항', accessor: 'note' },
    { Header: '', accessor: 'action', Cell: () => '조회' },
  ];

  return (
    <div>
      <HeaderComponent/>
      <Link className="link-styles" to="/">
        <button className="goto-citizens">&lt;</button>
      </Link>
      <SearchBar sort={sortData} search={search} currentPage={"Citizens"} isReversed={isReversed}/>
      <CitizenList columns={columns} data={data} />
    </div>
  );
};

export default Citizens;