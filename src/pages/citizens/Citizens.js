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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchCitizens = async () => {
      try {
        setLoading(true); // 로딩 상태 시작
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
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
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
    { Header: '이름', accessor: 'patientName' },
    { Header: '주소', accessor: 'address' },
    { Header: '병력', accessor: 'disease' },
    { Header: '특이사항', accessor: 'specialReport' },
  ];

  
  if (loading) return <div className="loading-wrapper">
    <img src="/icons/ic_spinner2.gif" alt="" />
  </div>;
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
      <HeaderComponent nav={navigate} isLogoutVisible={true}  acitveTab={"citizens"}/>
      <Link className='goto-back' to="/">
        <img src='/icons/ic_back.png' alt=''/>
      </Link>
     
      {isMobile && <p style={{fontSize: '14px', color: 'black', textAlign: 'center', marginTop: '37px'}}>늘픔에 기록된 주민 목록입니다.</p>}
      <SearchBar sort={sortData} search={search} currentPage={"Citizens"} isReversed={isReversed} onCitizenAddClick={navigateToCitizenAdd}/>
      {mainView}
    </div>
  );
};

export default Citizens;