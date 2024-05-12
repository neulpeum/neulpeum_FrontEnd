import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from 'components/SearchBar';
import HeaderComponent from "components/Header"
import CitizenList from './CitizenList';
import NoResultView from 'components/NoResult';
import 'styles/ForPages/Citizens/Citizens.css';


const Citizens = () => {
  const [isReversed, setReverse] = useState(false);
  const [originalCitizens, setOriginalCitizens] = useState([]);
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [finalKeyword, setFinalKeyword] = useState("");

  useEffect(() => {
    const fetchCitizens = async () => {
        try {
          setError(null);
          setOriginalCitizens(null);
          setLoading(true);
        const res = await axios.get(
          "/api/patient",
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "*",
            }
          },{withCredentials: true}
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
    setFinalKeyword(keyword);
    setCitizens(() => [...originalCitizens].filter((item) => item.patientName.includes(keyword)));
  }

  const navigateToCitizenAdd = () => {
    navigate("/citizenAdd", {});
  };

  const navigateToCitizenDetail = (citizenId) => {
    navigate("/citizensDetails", { state: { id: citizenId } });
  };

  const columns = [
    // { Header: '번호', accessor: 'patientId' },
    { Header: '이름', accessor: 'patientName' },
    { Header: '주소', accessor: 'address' },
    { Header: '병력', accessor: 'disease' },
    // { Header: '복용중인 약', accessor: 'takingDrug' },
    { Header: '특이사항', accessor: 'specialReport' },
    // { Header: '', accessor: 'action', Cell: () => '조회' },
  ];

  
  if (loading) return <div>로딩중..</div>;
  if (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      alert("접근 권한이 없습니다");
      navigate(-1);
    }
    return;
  }
  

  const mainView = citizens.length === 0 ?
   <NoResultView name={finalKeyword} explain={"는 존재하지 않는 주민입니다."} /> :
   <CitizenList columns={columns} data={citizens} onClickDetail={navigateToCitizenDetail}/>

  return (
    <div>
      <HeaderComponent nav={navigate} isLogoutVisible={true}/>
      <Link className='goto-back' to="/">
        <img src='/icons/ic_back.png' alt=''/>
      </Link>
      <SearchBar sort={sortData} search={search} currentPage={"Citizens"} isReversed={isReversed} onCitizenAddClick={navigateToCitizenAdd}/>
      {mainView}
    </div>
  );
};

export default Citizens;