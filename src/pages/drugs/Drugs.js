import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DrugList from "../../components/drugList/DrugList";
import HeaderComponent from "../../components/header/Header";
import SearchBar from "../../components/searchbar/SearchBar";
import FileUpload from "../../components/fileupload/FileUpload";
import NoResultView from "../../components/noResult/NoResult";
import * as FileSaver from "file-saver";
import * as XLSX from 'xlsx-js-style';

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
  const [uploadDrugs, setUploadDrugs] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [criKeyword, setCriKeryword] = useState("");

  const [renderingData, setRenderingData] = useState([]); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentDate = new Date();

  const columns = [
    { Header: "약 아이디", accessor: "drugId", type: "number" },
    { Header: "약 이름", accessor: "drugName", type: "text" },
    { Header: "유통기한", accessor: "expireDate", type: "text" },
    { Header: "남은 재고", accessor: "usableAmount", type: "number" },
    { Header: "등록일자", accessor: "drugEnrollTime", type: "text" },
    { Header: "마지막 사용 일자", accessor: "drugModifiedTime", type: "text" },
  ];

  const ReadJsonDrugs = (jsonDrugs) => {
    try {
      const FormattedDrugs = jsonDrugs.slice(1).map((row, index) => {
        const [drugName, expireDate, usableAmount, usable] = row;

        const dateOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };
        const currentDate = new Date()
          .toLocaleDateString("kr", dateOptions)
          .split(".")
          .join("-");
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
    } catch (error) {
      console.log("파일을 읽던 중 에러가 발생했습니다.", error);
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

  useEffect(() => {
    const getDatafromServer = () => {
      axios
        .get("/api/drug")
        .then((response) => {
          setOriginalDrugs(response.data);
        })
        .catch((error) => setError(error));
    };
    getDatafromServer();
  }, []);

  useEffect(() => {
    setRenderingData(originalDrugs);
  }, [originalDrugs]);

  useEffect(() => {
    setRenderingData(uploadDrugs);
  }, [uploadDrugs]);

  useEffect(() => {
    setFilterData(renderingData);
  }, [renderingData]);

  const ChangeDrugForm = (data) => {
    const newData = [];
    const modifyData = [];

    data.forEach((renderingItem) => {
      const existingIndex = originalDrugs.findIndex(
        (originalItem) => originalItem.drugId === renderingItem.drugId
      );

      if (existingIndex === -1) {
        newData.push({
          drugId: renderingItem.drugId + originalDrugs.length + 1,
          drugName: renderingItem.drugName,
          expireDate: renderingItem.expireDate,
          usableAmount: renderingItem.usableAmount,
        });
      } else if (renderingItem.isModified) {
        modifyData.push({ ...originalDrugs[existingIndex], ...renderingItem });
      }
    });
    return [newData, modifyData];
  };

  const addStatusToData = (data, status) => {
    return data.map((item) => ({ ...item, status }));
  };

  const UpdateDrugs = async () => {
    if (!renderingData)
      return alert("업데이트할 약 데이터가 존재하지 않습니다.");

    const [newData, modifyData] = ChangeDrugForm(renderingData);
    axios
      .put("/api/drug", [...newData, ...modifyData])

      .then((response) => {
        alert("약데이터가 성공적으로 등록되었습니다.");
        setOriginalDrugs((prevState) =>
          prevState.map((item) => {
            const modifiedItem = modifyData.find(
              (modifyItem) => modifyItem.drugId === item.drugId
            );
            return modifiedItem ? { ...item, ...modifiedItem } : item;
          })
        );
        setOriginalDrugs([
          ...originalDrugs,
          ...addStatusToData(newData, "add"),
        ]);
      })
      .catch((error) => setError(error));
  };

  function search(keyword, criteria) {
    setCriKeryword(keyword);
    const results = [];
    if (criteria) {
      renderingData.forEach((item) => {
        if (
          criteria === "expireDate" ||
          criteria === "drugEnrollTime" ||
          criteria === "drugModifiedTime"
        ) {
          const datePart = item[criteria].split(" ")[0];
          if (datePart.includes(keyword)) {
            results.push(item);
          }
        } else if (
          criteria === "drugName" &&
          item["drugName"].includes(keyword)
        ) {
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
      renderingData.forEach((item) => {
        if (
          item["expireDate"].includes(keyword) ||
          item["drugEnrollTime"].includes(keyword) ||
          item["drugModifiedTime"].includes(keyword)
        ) {
          const datePart1 = item["expireDate"].split(" ")[0];
          const datePart2 = item["drugEnrollTime"].split(" ")[0];
          const datePart3 = item["drugModifiedTime"].split(" ")[0];
          if (
            datePart1.includes(keyword) ||
            datePart2.includes(keyword) ||
            datePart3.includes(keyword)
          ) {
            results.push(item);
          }
        } else {
          for (const key in item) {
            if (
              item[key] &&
              typeof item[key] === "string" &&
              item[key].includes(keyword)
            ) {
              results.push(item);
            }
          }
        }
      });
      if (results.length !== 0) {
        setFilterData(results);
      } else {
        setFilterData([]);
        setCriKeryword(keyword);
      }
    }
  }

  function generateExcel() {
    const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const dateOptions = { year: 'numeric', month: 'long',day: 'numeric',};
    const name = `늘픔_${currentDate.toLocaleString('ko-KR', dateOptions)}, ${currentDate.getHours()}시 ${currentDate.getMinutes()}분`;

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

  const mainView =
    criKeyword && filterData.length === 0 ? (
      <>
        <NoResultView
          name={""}
          explain={"현재 등록된 약 정보가 없습니다"}
        ></NoResultView>
      </>
    ) : (
      <div className="drug-table">
        <DrugList
          columns={columns.slice(1, 6)}
          data={filterData}
          onQuantityChange={handleQuantityChange}
        />
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px', alignSelf: 'flex-end'}}>
          <DrugsStyledBtn onClick={generateExcel}>엑셀 파일 다운로드</DrugsStyledBtn>
          <DrugsStyledBtn onClick={UpdateDrugs}>변경사항 저장</DrugsStyledBtn>
        </div>
      </div>
    );

    if (error) {
      if (error.response.status === 401 || error.response.status === 403 || error.response.status === 400) {
        alert("접근 권한이 없습니다");
        navigate(-1);
        return;
      }
    }
    // (nav, isLogoutVisible)
  return (
    <>
      <HeaderComponent nav={navigate} isLogoutVisible={true}/>
      <UiPanelContainer>
        <FileUpload UploadedFile={ReadJsonDrugs} />
        <SearchBar search={search} currentPage={"Drugs"} />
      </UiPanelContainer>
      {mainView}

    </>
  );
};

export default Drugs;
