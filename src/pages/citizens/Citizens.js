import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "components/SearchBar";
import HeaderComponent from "components/Header";
import CitizenList from "./CitizenList";
import NoResultView from "components/NoResult";
import "styles/ForPages/Citizens/Citizens.css";
import HouseIcon from "Images/ic_house.svg";

const villageMappings = {
  "위 1,2": ["위 1,2"],
  "위 3,4": ["위 3,4"],
  "아래 1,2": ["아래 1,2"],
  "아래 3,4": ["아래 3,4"],
};

const Citizens = () => {
  const [isReversed, setReverse] = useState(false);
  const [originalCitizens, setOriginalCitizens] = useState([]);
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [finalKeyword, setFinalKeyword] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("전체");
  const [selectedVillages, setSelectedVillages] = useState(() => {
    const storedVillages = localStorage.getItem("selectedVillages");
    return storedVillages ? JSON.parse(storedVillages) : ["위 1,2", "위 3,4", "아래 1,2", "아래 3,4"];
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchCitizens = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/patient", {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "*",
          },
        });

        setOriginalCitizens(res.data);
        setCitizens(res.data.filter(
          (item) => isMobile 
            ? selectedVillages.some((village) => villageMappings[village].some(mapping => item.address.includes(mapping)))
            : true
        ));
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    fetchCitizens();
  }, [isMobile, selectedVillages]);

  useEffect(() => {
    filterCitizens();
  }, [selectedVillages, finalKeyword, searchCriteria]);

  useEffect(() => {
    localStorage.setItem("selectedVillages", JSON.stringify(selectedVillages));
  }, [selectedVillages]);

  const filterCitizens = () => {
    setCitizens(
      originalCitizens.filter((item) => {
        const matchesKeyword = searchCriteria === "전체"
          ? item.patientName.includes(finalKeyword) || item.address.includes(finalKeyword)
          : searchCriteria === "name"
          ? item.patientName.includes(finalKeyword)
          : item.address.includes(finalKeyword);

        return (
          (isMobile 
            ? (selectedVillages.length === 0 || selectedVillages.some((village) => villageMappings[village].some(mapping => item.address.includes(mapping)))) 
            : true) && matchesKeyword
        );
      })
    );
  };

  const toggleVillageFilter = (village) => {
    setSelectedVillages((prev) =>
      prev.includes(village)
        ? prev.filter((v) => v !== village)
        : [...prev, village]
    );
  };

  const sortData = () => {
    setCitizens((prevData) => [...prevData].reverse());
    setReverse(!isReversed);
  };

  const search = (keyword, criteria = "전체") => {
    setSearchCriteria(criteria);
    setFinalKeyword(keyword);
  };

  const navigateToCitizenAdd = () => {
    navigate("/citizenAdd");
  };

  const navigateToCitizenDetail = (citizenId) => {
    navigate("/citizensDetails", { state: { id: citizenId } });
  };

  const columns = [
    { Header: "이름", accessor: "patientName" },
    { Header: "주소", accessor: "address" },
    { Header: "병력", accessor: "disease" },
    { Header: "특이사항", accessor: "specialReport" },
  ];

  if (loading) {
    return (
      <div className="loading-wrapper">
        <img src="/icons/ic_spinner.gif" alt="" />
      </div>
    );
  }

  if (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      alert("접근 권한이 없습니다");
      navigate(-1);
    }
    return;
  }

  const mainView =
    citizens.length === 0 ? (
      <NoResultView
        name={finalKeyword}
        explain={finalKeyword.trim().length === 0 ? "해당 마을에 존재하지 않는 주민입니다." : "는 존재하지 않는 주민입니다."}
      />
    ) : (
      <CitizenList
        columns={columns}
        data={citizens.sort((a, b) => b.patientId - a.patientId)}
        onClickDetail={navigateToCitizenDetail}
      />
    );

  return (
    <div style={{ overflowX :'hidden'}}>
      <HeaderComponent
        nav={navigate}
        isLogoutVisible={true}
        acitveTab={"citizens"}
      />
      {isMobile && (
        <p
          style={{
            fontSize: "14px",
            color: "black",
            textAlign: "center",
            marginTop: "37px",
          }}
        >
          늘픔에 기록된 주민 목록입니다.
        </p>
      )}
      <SearchBar
        sort={sortData}
        search={search}
        currentPage={"Citizens"}
        isReversed={isReversed}
        onCitizenAddClick={navigateToCitizenAdd}
      />
      {isMobile && (
        <div className="filter-buttons">
          {["위 1,2", "위 3,4", "아래 1,2", "아래 3,4"].map((village) => (
            <button
              key={village}
              className={`filter-button ${
                selectedVillages.includes(village) ? "active" : ""
              }`}
              onClick={() => toggleVillageFilter(village)}
            >
              {selectedVillages.includes(village) && (
              <img 
                src={HouseIcon} 
                alt="" 
              />
            )}
              {village}
            </button>
          ))}
        </div>
      )}
      {mainView}
    </div>
  );
};

export default Citizens;
