import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as FileSaver from "file-saver";
import * as XLSX from 'xlsx-js-style';
import HeaderComponent from "components/Header";
import SearchBar from "components/SearchBar";
import NoResultView from "components/NoResult";
import DrugList from "./DrugList";
import FileUpload from "./FileUpload";
import 'styles/ForPages/Drugs/Drugs.css';
import { MyDate } from 'utils/MyDate';

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
  background-color: #aed391;
  border: none;
  cursor: pointer;
`;

const Drugs = () => {
  const [originalDrugs, setOriginalDrugs] = useState([]);
  const [renderingData, setRenderingData] = useState([]);
  const [criKeyword, setCriKeyword] = useState(['', '']);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const columns = [
    { Header: "약 아이디", accessor: "drugId", type: "number" },
    { Header: "약 이름", accessor: "drugName", type: "text" },
    { Header: "유통기한", accessor: "expireDate", type: "text" },
    { Header: "남은 재고", accessor: "usableAmount", type: "number" },
    { Header: "등록일자", accessor: "drugEnrollTime", type: "text" },
    { Header: "마지막 사용 일자", accessor: "drugModifiedTime", type: "text" },
  ];

  const handleGetDatafromServer = (data) => {
    const FormattedData = data.map((array) => {
      return {
        ...array,
        expireDate: MyDate.convertDate(array.expireDate, 3),
        drugEnrollTime: MyDate.convertDate(array.drugEnrollTime, 3),
        drugModifiedTime: MyDate.convertDate(array.drugModifiedTime, 3), 
      };
    });
    setOriginalDrugs(FormattedData);
    setRenderingData(FormattedData);
    // setOriginalDrugs(data.map((array) => {
    //   return {
    //     ...array,
    //     expireDate: MyDate.convertDate(array.expireDate, 3),
    //     drugEnrollTime: MyDate.convertDate(array.drugEnrollTime, 3),
    //     drugModifiedTime: MyDate.convertDate(array.drugModifiedTime, 3), 
    //   };
    // }));
  }

  useEffect(() => {
    const getDatafromServer = async () => {
      await axios
        .get("/api/drug")
        .then((response) => handleGetDatafromServer(response.data))
        .catch((error) => setError(error));
    };
    getDatafromServer();
  }, []);

  // useEffect(() => {
  //   setRenderingData(originalDrugs);
  // }, [originalDrugs]);

  const ReadJsonDrugs = (jsonDrugs) => {
    if (jsonDrugs.length !== 0) {
      try {
        const FormattedDrugs = jsonDrugs.slice(1).map((row, index) => {
          const [drugName, expireDate, usableAmount, usable] = row;

          return {
            drugId: index + originalDrugs.length,
            drugName: drugName,
            expireDate: MyDate.convertDate(ConvertedDate(expireDate), 3),
            usableAmount: (usableAmount-usable),
            drugEnrollTime: MyDate.convertDate(MyDate.createCurrentDate(), 3),
            drugModifiedTime: null,
          };
        });
        setRenderingData(FormattedDrugs, 3);
      } catch (error) {
        console.log("파일을 읽던 중 에러가 발생했습니다.", error);
      }
    }
  };

  // 엑셀 형식 Date -> json 형식 Date : 변환
  function ConvertedDate(excelDate) {
    // 엑셀 날짜의 기준일 (1900년 1월 0일)
    const baseDate = new Date(1899, 11, 31);
    // 엑셀 날짜에 해당하는 밀리초 계산
    const milliseconds = excelDate * 24 * 60 * 60 * 1000;
    const jsDate = new Date(baseDate.getTime() + milliseconds);
    const formattedDate = jsDate.toISOString().split("T")[0];
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

  const ChangeDrugForm = (data) => {
    const newData = [];
    const modifyData = [];

    data.forEach((renderingItem) => {
      //여기서 기존에 있는 약데이터들과비교해서 새로운 약데이터를 찾을때 drugId를 통해 알아보는데 이게 맨 처음사이트를 사용할때 문제가 될 수 있음 차후에 알아보겟음
      const existingIndex = originalDrugs.findIndex((originalItem) => 
      originalItem.drugId === renderingItem.drugId && originalItem.drugName === renderingItem.drugName);

      const drugId = renderingItem.drugId;
      const drugName = renderingItem.drugName;
      const expireDate = MyDate.convertDate(renderingItem.expireDate, 0);
      const usableAmount = renderingItem.usableAmount;

      if (existingIndex === -1) {
        newData.push({
          drugId: drugId + originalDrugs.length + 1,
          drugName: drugName,
          expireDate: expireDate,
          usableAmount: usableAmount,
        });
      } else if (renderingItem.isModified) {
        const modifiedDrug = { ...originalDrugs[existingIndex], ...renderingItem };
        modifiedDrug.expireDate = expireDate;
        modifyData.push(modifiedDrug);
      }
    });
    return [newData, modifyData];
  };

  const PostProcessing = (newData, modifyData) => {
    alert("약데이터가 성공적으로 등록되었습니다.");
    const newDataWithTimestamp = newData.map(item => ({
      ...item,
      expireDate: MyDate.convertDate(item.expireDate, 3),
      drugEnrollTime: MyDate.convertDate(MyDate.createCurrentDate(), 3),
      drugModifiedTime: null,
      isAdd: true
    }));

    const modifyDataWithTimestamp = modifyData.map(item => ({
        ...item,
        expireDate: MyDate.convertDate(item.expireDate, 3),
        drugModifiedTime: MyDate.convertDate(MyDate.createCurrentDate(), 3),
    }));

    setOriginalDrugs(prevState => [
        ...prevState.map(item => {
            const modifiedItem = modifyDataWithTimestamp.find(modifyItem => modifyItem.drugId === item.drugId);
            return modifiedItem ? { ...item, ...modifiedItem } : item;
        }),
        ...newDataWithTimestamp
    ]);
    setRenderingData(originalDrugs);
    console.log(renderingData, originalDrugs);
  }

  const UpdateDrugs = async () => {
    if (!renderingData) return alert("업데이트될 약 데이터가 보이지 않습니다.");
    const [newData, modifyData] = ChangeDrugForm(renderingData);
    axios
      .put("/api/drug", [...newData, ...modifyData])
      .then((response) => PostProcessing(newData, modifyData))
      .catch((error) => setError(error));
  };

  const handleInitialized = () => {
    setRenderingData(originalDrugs);
  }

  function search(keyword, criteria) {
    const result = [];
    setCriKeyword([keyword, criteria]);

    renderingData.forEach((item) => {
      if (criteria) {
        if (item[criteria].includes(keyword))
          result.push(item.drugId);
      } else {
        if (item["expireDate"].includes(keyword) || item["drugEnrollTime"].includes(keyword) ||
          (item["drugModifiedTime"] && item["drugModifiedTime"].includes(keyword)) || item["drugName"].includes(keyword))
          result.push(item.drugId);
        }
      });
    setSearchResults(result);
  }

  function generateExcel() {
    const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const name = `늘픔_${MyDate.convertDate(MyDate.createCurrentDate(), 4)}`;

    const headerStyle = {
      font: { bold: true, sz: '24' },
      border: { top: {style: "thin"}, bottom: {style: "thin"}, left: {style: "thin"}, right: {style: "thin"} },
      alignment: { horizontal: "center", vertical: "center" },
    };
    const rowStyle = {
      font: { bold: true, sz: '18' },
      border: { top: {style: "thin"}, bottom: {style: "thin"}, left: {style: "thin"}, right: {style: "thin"} },
      alignment: { horizontal: "center", vertical: "center" },
    };

    const headerData = [
      { v: '약 이름', s: headerStyle },
      { v: '유통기한', s: headerStyle },
      { v: '현재 수량', s: headerStyle },
      { v: '사용량', s: headerStyle },
    ];

    const rowData = Array(50).fill([ { v: '', s: rowStyle }, { v: '', s: rowStyle }, { v: '', s: rowStyle }, { v: '', s: rowStyle } ]);
    const ws = XLSX.utils.aoa_to_sheet([headerData].concat(rowData));

    ws['!cols'] = Array(100).fill({ wpx: 200 });
    ws['!rows'] = Array(100).fill({ hpx: 50 });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelButter = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const excelFile = new Blob([excelButter], { type: type });
    FileSaver.saveAs(excelFile, name);
  }

  if (error) {
    console.log(error)
    if (error.response.status === 401 || error.response.status === 403 || error.response.status === 400) {
      alert("접근 권한이 없습니다");
    }
    navigate(-1);
  }

  const drugView =
  <> {(criKeyword[0] === '')
    ? <DrugList columns={columns.slice(1, 6)} data={renderingData} onQuantityChange={handleQuantityChange}/> 
      : (searchResults.length > 0) 
      ? <>
        {/* <p>{criKeyword[0]}을 {criKeyword[1]} 기준으로 검색한 내용입니다.</p> */}
        {/* const data ={renderingData.filter((item) => {return searchResults.includes(item.drugId)})} */}
        <DrugList columns={columns.slice(1, 6)} data={renderingData.filter((item) => {return searchResults.includes(item.drugId)})} onQuantityChange={handleQuantityChange}/> 
        </>
        : 
        <NoResultView name={criKeyword[0]} explain={"과 일치하는 내용이 없습니다."}/>
    }
    <div className="drug-btns-container">
      <DrugsStyledBtn onClick={handleInitialized}>변경사항 초기화</DrugsStyledBtn>
      <DrugsStyledBtn onClick={generateExcel}>엑셀파일 다운로드</DrugsStyledBtn>
      <DrugsStyledBtn onClick={UpdateDrugs}>변경사항 저장</DrugsStyledBtn>
    </div>
  </>
      

  return (
    <>
      <HeaderComponent nav={navigate} isLogoutVisible={true}/>
      <UiPanelContainer>
        <FileUpload Uploading={ReadJsonDrugs} />
        <SearchBar search={search} currentPage={"Drugs"} />
      </UiPanelContainer>
      {drugView}
    </>
  );
};

export default Drugs;
