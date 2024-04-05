import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import * as XLSX from "xlsx";
import DrugList from "../../components/drugList/DrugList";
import HeaderComponent from "../../components/header/Header";
import SearchBar from "../../components/searchbar/SearchBar";
import FileUpload from "../../components/fileupload/FileUpload";
import NoResultView from "../../components/noResult/NoResult";
import { json } from "react-router-dom";
import { render } from "@testing-library/react";

const UiPanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 11.5% 0 11.5%;
  width: 75%;
  height: 12.7%;
  gap: 1rem;
`;

const DrugsStyledBtn = styled.button`
    width: 192px;
    height: 48px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 5px;
    color: white;
    background-color: #AED391;
    border: none;
    cursor: pointer;
    align-self: flex-end;
`
const Drugs = () => {
  const [originalDrugs, setOriginalDrugs] = useState([]); // 이게 서버에 저장중인 약 데이터 현재 최초 랜더링시에만 가져옴
  const [uploadDrugs, setUploadDrugs] = useState([]); // 업로드한 파일
  const [filterData, setFilterData] = useState([]); // 검색 결과 데이터
  const [criKeyword, setCriKeryword] = useState(""); // 검색 필드 데이터

  const [mainViewState, setMainViewState] = useState('main'); // 초기 메인 뷰 상태는 'main'으로 설정
  const [renderingData, setRenderingData] = useState([]); // 요게 화면에 랜더링할 약 데이터 1. 일단 이걸 모든 데이터 형태에 연결하는걸 최우선으로!!!!!
  const [errorView, setErrorView] = useState(null);
  const navigate = useNavigate();

  const columns = [
        { Header: "약 아이디", accessor: 'drugId', type: 'number'},
        { Header: "약 이름", accessor: 'drugName', type: 'text'},
        { Header: "유통기한", accessor: 'expireDate', type: 'text'},
        { Header: "남은 재고", accessor: 'usableAmount', type: 'number',},
        { Header: "등록일자", accessor: 'drugEnrollTime', type: 'text'},
        { Header: "마지막 사용 일자", accessor: 'drugModifiedTime', type: 'text'},
    ];

    const ReadJsonDrugs = (jsonDrugs) => {
      try{
        const FormattedDrugs = jsonDrugs.slice(1).map((row, index) => {

          const [drugName, expireDate, usableAmount, usable] = row; //??? 도대체 현재 재고량이랑 사용량을 엑셀파일에 둘다 기제하는 이유가 뭐지??

          const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const currentDate = new Date().toLocaleDateString('kr', dateOptions).split('.').join('-');
          return {
              drugId: index,
              drugName: drugName,
              expireDate: ConvertedDate(expireDate),
              usableAmount: usableAmount,
              drugEnrollTime: currentDate,
              drugModifiedTime: null,
            };
        });
        setUploadDrugs(FormattedDrugs);
      } catch (error){
        console.log('파일을 읽던 중 에러가 발생했습니다.', error);
      }
    }

    // 엑셀 형식 Date -> json 형식 Date : 변환
    function ConvertedDate(excelDate) {
        // 엑셀 날짜의 기준일 (1900년 1월 0일)
        const baseDate = new Date(1899, 11, 31);
        // 엑셀 날짜에 해당하는 밀리초 계산
        const milliseconds = excelDate * 24 * 60 * 60 * 1000;
        const jsDate = new Date(baseDate.getTime() + milliseconds);
        const formattedDate = jsDate.toISOString().split('T')[0]
        return formattedDate;
    }

  const handleQuantityChange = (index, change) => {
    setRenderingData((prevData) => {
      const newData = [...prevData];
      newData[index].usableAmount += change;
      newData[index].isModified = true;
      return newData;
    });
  };

  useEffect(() => {
    const getDatafromServer = () => {
      axios.get("/api/drug")
      .then((response) => { setOriginalDrugs(response.data);})
      .catch((error) => {
          if (error.code === "Bad Request") {alert('잘못된 요청입니다.', error);} 
          else {console.error(error);}
      })
    }
    getDatafromServer();
  }, []);


    useEffect(() => {
      setRenderingData(originalDrugs);
    }, [originalDrugs]);

    useEffect(() => {
      setRenderingData(uploadDrugs);
    }, [uploadDrugs]);

    useEffect(() => {
        if (!originalDrugs) {
          axios.get("/api/drug")
            .then((response) => {
                const data = response.data;
                setOriginalDrugs(data);
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                  alert("접근 권한이 없습니다");
                  navigate(-1);
                  return;
                }
                if (error.code === "Bad Request") {
                    alert('잘못된 요청입니다.', error);
                } else {
                    console.error(error);
                }
            })
        setRenderingData(filterData);
      }
    }, [filterData]);

    const ChangeDrugForm = (data) => {

      const newData = [];
      const modifyData = [];

      data.forEach(renderingItem => {
        const existingIndex = originalDrugs.findIndex(originalItem => originalItem.drugId === renderingItem.drugId);
        
        if (existingIndex === -1) {
          newData.push({
            drugId: renderingItem.drugId + originalDrugs.length + 1,
            drugName: renderingItem.drugName,
            expireDate: renderingItem.expireDate,
            usableAmount: renderingItem.usableAmount,
          });
        } else if (renderingItem.isModified) {
          modifyData.push({...originalDrugs[existingIndex], ...renderingItem});
        }
      });
      return [newData, modifyData];
    }                

  const addStatusToData = (data, status) => {
    return data.map(item => ({ ...item, status }));
  };

    const UpdateDrugs = async () => {
      if (!renderingData) return alert('업데이트할 약 데이터가 존재하지 않습니다.');

      const [newData, modifyData] = ChangeDrugForm(renderingData);
      axios.put("/api/drug", [...newData, ...modifyData])

      .then(response => {
          alert('약데이터가 성공적으로 등록되었습니다.');
          setOriginalDrugs(prevState => prevState.map(item => {
            const modifiedItem = modifyData.find(modifyItem => modifyItem.drugId === item.drugId);
            return modifiedItem ? { ...item, ...modifiedItem } : item;
          }));
          setOriginalDrugs([...originalDrugs, ...addStatusToData(newData, 'add')]);
      })
      .catch(error => {
          if (error.response.status === 401 || error.response.status === 403) {
              alert("접근 권한이 없습니다");
              navigate(-1);
              return;
          }
          if (error.code === "Bad Request") {
              alert('허용되지 않는 등록 요청을 감지했습니다.', error);
          }
      })
    }

    function search(keyword, criteria) {
        setCriKeryword(keyword);
        const results = [];
        if (criteria) {
          originalDrugs.forEach((item) => {

            if (!isNaN(keyword)) {
              if (item[criteria] && item[criteria].includes(keyword)) {
                results.push(item);
              }
            } else {
              if (item[criteria] && item[criteria] === parseInt(keyword)) {
                results.push(item);
              }
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
            [...originalDrugs].filter((item) => item.drugName.includes(keyword))
          );
        }
      }
    //에러 메시지 뷰를 따로 만들어서 에러 상황이 아닐시에만 display:block이 되게 해볼까?
  const mainView = (renderingData.length !== 0) ? 
    <div className="drug-table">
      <DrugList columns={columns.slice(1, 6)} data={renderingData} onQuantityChange={handleQuantityChange}/>
      <DrugsStyledBtn onClick={UpdateDrugs}>변경사항 저장</DrugsStyledBtn> 
    </div> 
    : 
    <>
      <NoResultView name={criKeyword} explain={'현재 등록된 약 정보가 없습니다'}></NoResultView>
    </>

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
