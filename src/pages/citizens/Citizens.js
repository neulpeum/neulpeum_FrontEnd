import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SearchBar from '../../components/searchbar/SearchBar';
import CitizenList from '../../components/citizenList/CitizenList';
import HeaderComponent from '../../components/header/Header';
import axios from "axios";


const Citizens = () => {
  const [isReversed, setReverse] = useState(false);
  const [originalCitizens, setOriginalCitizens] = useState([]);
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   useEffect(() => {
    const fetchCitizens = async () => {
        try {
          setError(null);
          setOriginalCitizens(null);
          setLoading(true);
        const res = await axios.get(
          "http://52.78.35.193:8080/api/patient"
        );

        setOriginalCitizens(res.data);
        setCitizens(res.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchCitizens();
  }, []);

  function sortData() {
    setCitizens(prevData => [...prevData].reverse());
    setReverse(!isReversed);
  };

  function search(keyword) {
    setCitizens(() => [...originalCitizens].filter((item) => item.patientName.includes(keyword)));
  }

  const columns = [
    { Header: '번호', accessor: 'patientId' },
    { Header: '이름', accessor: 'patientName' },
    { Header: '주소', accessor: 'address' },
    { Header: '병력', accessor: 'disease' },
    { Header: '복용중인 약', accessor: 'takingDrug' },
    { Header: '특이사항', accessor: 'speicalReport' },
    { Header: '', accessor: 'action', Cell: () => '조회' },
  ];

  
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <div>
      <HeaderComponent/>
      <Link className="link-styles" to="/">
        <button className="goto-citizens">&lt;</button>
      </Link>
      <SearchBar sort={sortData} search={search} currentPage={"Citizens"} isReversed={isReversed}/>
      <CitizenList columns={columns} data={citizens} />
    </div>
  );
};

export default Citizens;