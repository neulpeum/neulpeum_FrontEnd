import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import * as XLSX from "xlsx";
import DrugList from "../../components/drugList/DrugList";
import HeaderComponent from "../../components/header/Header";
import SearchBar from "../../components/searchbar/SearchBar";
import FileUpload from "../../components/fileupload/FileUpload";
import NoResultView from "../../components/noResult/NoResult";

const UiPanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 11.5%;
  margin-top: 2rem;
  width: 75%;
  height: 12.7%;
  gap: 1rem;
`;
const DrugsTableStyledBtn = styled.button`
    width: 25px;
    height: 25px;
    font-size: 24px;
    font-weight: bold;
    border-radius: 50%;
    color: white;
    background-color: #AED391;
    border: none;
    cursor: pointer;
    // margin: 0 7px;
`
const DrugsStyledBtn = styled(DrugsTableStyledBtn)`
    width: 192px;
    height: 48px;
    border-radius: 5px;
`
const Drugs = () => {
  const [originalDrugs, setOriginalDrugs] = useState(null); // 이게 서버에 저장중인 약 데이터 현재 최초 랜더링시에만 가져옴
  const [currentDrugsData, setCurrentDrugsData] = useState([]); // 요게 화면에 랜더링할 약 데이터 Current
  const [filterData, setFilterData] = useState([]);
  const [criKeyword, setCriKeryword] = useState("");

    // Intl.DateTimeFormat의 날짜 포맷팅 옵션들 
    const dateOptions = {
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
    }

    const columns = [
        { Header: "약 아이디", accessor: 'drugId', type: 'number'},
        { Header: "약 이름", accessor: 'drugName', type: 'text'},
        { Header: "유통기한", accessor: 'expireDate', type: 'text'},
        { Header: "남은 재고", accessor: 'usableAmount', type: 'number',
            Cell: ({ row }) => (
                <div className='usableAmount-cell' style={{display: 'flex', justifyContent: 'space-between', padding: '0 20px'}}>
                    <DrugsTableStyledBtn onClick={() => handleQuantityChange(row.index, 1) }>+</DrugsTableStyledBtn>
                    {row.values.usableAmount}
                    <DrugsTableStyledBtn onClick={() => handleQuantityChange(row.index, -1) }>-</DrugsTableStyledBtn>
                </div>
            )
        },
        {Header: "등록일자", accessor: 'drugEnrollTime', type: 'text'},
        {Header: "마지막 사용 일자", accessor: 'drugModifiedTime', type: 'text'},
    ];

    const ReadJsonDrugs = (jsonDrugs) => {
        // slice(1) 를 통해 엑셀의 헤더부분을 제외하고 mapping하는 작업을 했지만... 왠지 모르게 불만족스럽다. 
        // 더 정교하게 설계해야겠다.
        const FormattedDrugs = jsonDrugs.slice(1).map((row, index) => {
            const [drugName, expireDate, usableAmount, usable] = row; //??? 도대체 현재 재고량이랑 사용량을 엑셀파일에 둘다 기제하는 이유가 뭐지??
            const drugId = index; //임시로 부여한 약 데이터
            const currentDate = new Intl.DateTimeFormat('kr',  dateOptions).format(new Date());

            return {
                drugId: drugId,
                drugName: drugName,
                expireDate: ConvertedDate(expireDate),
                usableAmount: usableAmount,
                drugEnrollTime: currentDate,
                drugModifiedTime: <>아직 사용되지 않았습니다.</>,
              };
        });
        setCurrentDrugsData(FormattedDrugs);
    }

    // 엑셀 형식 Date -> json 형식 Date : 변환
    function ConvertedDate(excelDate) {
        // 엑셀 날짜의 기준일 (1900년 1월 0일)
        const baseDate = new Date(1899, 11, 31);
        // 엑셀 날짜에 해당하는 밀리초 계산
        const milliseconds = excelDate * 24 * 60 * 60 * 1000;
        const jsDate = new Date(baseDate.getTime() + milliseconds);
        const formattedDate = new Intl.DateTimeFormat('kr',  dateOptions).format(jsDate);
        return formattedDate;
    }

  const handleQuantityChange = (index, change) => {
    setCurrentDrugsData((prevData) => {
      const newData = [...prevData];
      newData[index].usableAmount += change;
      return newData;
    });
  };

    // function FormatTimeFromDrugs(array) {
    //     const newArray = array.map(item => {
    //         item.drugEnrollTime = new Intl.DateTimeFormat('kr',  dateOptions).format(new Date(item.drugEnrollTime));
    //         item.drugModifiedTime = new Intl.DateTimeFormat('kr',  dateOptions).format(new Date(item.drugModifiedTime));
    //         return item;
    //     });
    
    //     return newArray;
    // }

    useEffect(() => {
        if (!originalDrugs) {
            axios.get("http://52.78.35.193:8080/api/drug")
            .then((response) => {
                // const data = FormatTimeFromDrugs(response.data);
                const data = response.data;
                setOriginalDrugs(data);
                setCurrentDrugsData(data);
            })
            .catch((error) => {
                if (error.code === "Bad Request") {
                    alert('잘못된 요청입니다.', error);
                } else {
                    console.error(error);
                }
            })
        }
    }, []);

    const ReadyUpdateDrugs = () => {
        const requestData = currentDrugsData.map(item => ({
            drugId: item.drugId + originalDrugs.length,
            drugName: item.drugName,
            expireDate: item.expireDate,
            usableAmount: item.usableAmount,
          }));
          return(requestData);
    }                

    const UpdateDrugs = async () => {
        if (currentDrugsData) {
            const body = ReadyUpdateDrugs();

            axios.put("http://52.78.35.193:8080/api/drug", body)
            .then(response => {
                alert('약데이터가 성공적으로 등록되었습니다.', response);
                setOriginalDrugs(currentDrugsData, originalDrugs);
            })
            .catch(error => {
                console.log(error);
                if (error.code === "Bad Request") {
                    alert('허용되지 않는 등록 요청을 감지했습니다.', error);
                }
            })
        } else {
            alert('등록 혹은 수정시킬 약 데이터가 존재하지 않습니다.');
        }
    }

    function search(keyword, criteria) {
        setCriKeryword(keyword);
        const results = [];
        if (criteria) {
          currentDrugsData.forEach((item) => {
            if (item[criteria] && item[criteria].includes(keyword)) {
              results.push(item);
            }
          });
          if (results.length !== 0) {
            setFilterData(results);
          } else {
            setFilterData([]);
            setCriKeryword(keyword);
          }
        } else {
          setFilterData(() =>
            [...currentDrugsData].filter((item) => item.drugName.includes(keyword))
          );
        }
      }

    const mainView = 
        originalDrugs && filterData.length === 0 ? (
            <NoResultView name={criKeyword} explain={"는/은 존재하지 않는 약 이름입니다."} /> 
        ): (
            <div style={{display :'flex', flexDirection:'column', padding:'5px'}}>
                <DrugList columns={columns.slice(1, 6)} data={currentDrugsData}/>
                <DrugsStyledBtn onClick={UpdateDrugs}>변경사항 저장</DrugsStyledBtn>
            </div>
        )

  return (
    <>
      <HeaderComponent />
      <UiPanelContainer>
        <FileUpload UploadedFile={ReadJsonDrugs} />
        <SearchBar search={search} currentPage={"Drugs"} />
      </UiPanelContainer>
      {mainView}
    </>
  );
};

export default Drugs;
