import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx-js-style";
import HeaderComponent from "components/Header";
import SearchBar from "components/SearchBar";
import NoResultView from "components/NoResult";
import DrugList from "./DrugList";
import FileUpload from "./FileUpload";
import "styles/ForPages/Drugs/Drugs.css";
import { MyDate } from "utils/MyDate";

const Drugs = () => {
  const [originalDrugs, setOriginalDrugs] = useState([]);
  const [renderingData, setRenderingData] = useState([]);
  const [criKeyword, setCriKeyword] = useState(["", ""]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
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
        expireDate: MyDate.ConvertDate(array.expireDate, 3),
        drugEnrollTime: MyDate.ConvertDate(array.drugEnrollTime, 3),
        drugModifiedTime: MyDate.ConvertDate(array.drugModifiedTime, 3),
      };
    });
    const deepCopyArray = JSON.parse(JSON.stringify(FormattedData));
    setRenderingData(FormattedData);
    setOriginalDrugs(deepCopyArray);
  };

  useEffect(() => {
    const getDatafromServer = async () => {
      setLoading(true); // 로딩 상태 시작
      await axios
        .get("/api/drug")
        .then((response) => {
          handleGetDatafromServer(response.data);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    };
    getDatafromServer();
  }, [setLoading]);

  const ReadJsonDrugs = (jsonDrugs) => {
    if (jsonDrugs.length !== 0) {
      try {
        const FormattedDrugs = jsonDrugs.slice(0).map((row, index) => {
          const [drugName, expireDate, usableAmount, usable] = row;

          return {
            drugId: originalDrugs.length + index + 1,
            drugName: drugName,
            expireDate: MyDate.ConvertDate( MyDate.ConvertedExceltoJsonDate(expireDate), 3),
            usableAmount: usableAmount - usable,
            drugEnrollTime: MyDate.ConvertDate(MyDate.CreateCurrentDate(), 3),
            drugModifiedTime: null,
          };
        });
        setRenderingData((prevData) => [...FormattedDrugs, ...prevData]);
      } catch (error) {
        alert("파일을 읽던 중 에러가 발생했습니다.", error);
      }
    }
  };

  const handleQuantityChange = (index, change) => {
    setRenderingData((prevData) => {
      const newData = [...prevData];
      newData[index].usableAmount += change;
      newData[index].isModified = true;
      return newData;
    });
  };

  const ChangeDrugForm = (data) => {
    if (!data) {
      alert("현재 등록할 데이터가 없습니다!");
      return;
    }
    const newData = [];
    const modifyData = [];

    data.forEach((renderingItem) => {
      const existingIndex = originalDrugs.findIndex(
        (originalItem) =>
          originalItem.drugId === renderingItem.drugId &&
          originalItem.drugName === renderingItem.drugName &&
          originalItem.expireDate === renderingItem.expireDate
      );

      const expireDate = MyDate.ConvertDate(renderingItem.expireDate, 0);
      const drugModifiedTime = MyDate.ConvertDate(
        MyDate.CreateCurrentDate(),
        0
      );

      if (existingIndex === -1) {
        const k = { ...renderingItem };
        k.expireDate = expireDate;
        newData.push(k);
      } else if (renderingItem.isModified) {
        const modifiedDrug = {
          ...originalDrugs[existingIndex],
          ...renderingItem,
        };
        modifiedDrug.expireDate = expireDate;
        modifiedDrug.drugModifiedTime = drugModifiedTime;
        modifyData.push(modifiedDrug);
      }
    });

    if (newData.length === 0 && modifyData.length === 0) {
      alert("새롭거나 수정된 약이 없습니다.");
      return new Error();
    }

    return [newData, modifyData];
  };

  const PostProcessing = async () => {
    alert("성공적으로 등록되었습니다.");
    await axios
      .get("/api/drug")
      .then((response) => handleGetDatafromServer(response.data))
      .catch((error) => setError(error));
  };

  const UpdateDrugs = async () => {
    if (!renderingData) return alert("업데이트될 약 데이터가 보이지 않습니다.");
    try {
      const [newData, modifyData] = ChangeDrugForm(renderingData);
      axios
        .put("/api/drug", [...newData, ...modifyData])
        .then((response) => PostProcessing())
        .catch((error) => setError(error));
    } catch (error) {
      return;
    }
  };

  const handleInitialized = () => {
    if (!originalDrugs) return;
    const deepCopyArray = JSON.parse(JSON.stringify(originalDrugs));
    setRenderingData([...deepCopyArray]);
  };

  function search(keyword, criteria) {
    const result = [];
    setCriKeyword([keyword.split(" ").join(""), criteria]);

    renderingData.forEach((item) => {
      if (criteria === "전체") {
        if (
          item["expireDate"].split(" ").join("").includes(keyword) ||
          item["drugEnrollTime"].split(" ").join("").includes(keyword) ||
          (item["drugModifiedTime"] && item["drugModifiedTime"].split(" ").join("").includes(keyword)) ||
          item["drugName"].split(" ").join("").includes(keyword))
          result.push(item.drugId);
      } 
      else {
        if (item[criteria].split(" ").join("").includes(keyword))
          result.push(item.drugId);
      }
    });
    setSearchResults(result);
  }

  function generateExcel() {
    const type =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const name = `늘픔_${MyDate.ConvertDate(MyDate.CreateCurrentDate(), 4)}`;

  //   font: { bold: true, sz: "28", color: "#FFFFFF" }, // 폰트 색상 변경
  // fill: { type: "pattern", patternType: "solid", fgColor: "#aed391" }, // 배경색 설정
    const headerStyle = {
      font: { 
        bold: true, 
        sz: "28", 
        color: { rgb: "FFFFFF" },
      },
      fill: { 
        patternType: "solid", 
        fgColor: { rgb: "AED391" },
      },
      border: {
        top: { style: "thin", color: {rgb: "FFFFFF"}},
        bottom: { style: "thin", color: {rgb: "FFFFFF"} },
        // left: { style: "thin", color: {rgb: "FFFFFF"} },
        // right: { style: "thin", color: {rgb: "FFFFFF"} },
      },
      alignment: { 
        horizontal: "center", 
        vertical: "center" 
      },
    };
    const rowStyle = {
      font: { 
        bold: false, 
        sz: "18", 
        color: {rgb : "000000" },
      },
      fill: { 
        patternType: "solid", 
        fgColor: {rgb: "DADADA"},
      },
      border: {
        top: { style: "thin", color: {rgb: "FFFFFF"} },
        bottom: { style: "thin", color: {rgb: "FFFFFF"} },
        // left: { style: "thin", color: {rgb: "FFFFFF"} },
        // right: { style: "thin", color: {rgb: "FFFFFF"} },
      },
      alignment: { 
        horizontal: "center", 
        vertical: "center" 
      },
    };

    const headerData = [
      { v: "약 이름", s: headerStyle },
      { v: "유통기한", s: headerStyle },
      { v: "현재 수량", s: headerStyle },
      { v: "사용량", s: headerStyle },
    ];

    const rowData = Array(50).fill([
      { v: "", s: rowStyle },
      { v: "", s: rowStyle },
      { v: "", s: rowStyle },
      { v: "", s: rowStyle },
    ]);

    const exampleData = [
      { v: "예시) 아스피린", s: rowStyle },
      { v: "예시) 24.12.31 혹은 2024.12.31", s: rowStyle },
      { v: "예시) 100", s: rowStyle },
      { v: "예시) 5, 빈칸일 시 자동으로 0입니다. ", s: rowStyle },
    ];

    rowData.unshift(exampleData);

    const ws = XLSX.utils.aoa_to_sheet([headerData].concat(rowData));
    
    ws["!cols"] = Array(100).fill({ wpx: 250 });
    ws["!rows"] = Array(100).fill({ hpx: 50 });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelButter = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelButter], { type: type });
    saveAs(excelFile, name);
  }

  if (error) {
    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      error.response.status === 400
    ) {
      alert("접근 권한이 없습니다");
    }
    navigate(-1);
  }

  const key =
    criKeyword[1] === "drugName"
      ? "약 이름"
      : criKeyword[1] === "expireDate"
      ? "유통기한"
      : criKeyword[1] === "drugEnrollTime"
      ? "등록일자"
      : criKeyword[1] === "drugModifiedTime"
      ? "마지막 사용 일자"
      : "전체";

  const drugView = (
    <>
      {" "}
      {criKeyword[0] === "" ? (
        <DrugList
          columns={columns.slice(1, 6)}
          data={renderingData}
          onQuantityChange={handleQuantityChange}
        />
      ) : searchResults.length > 0 ? (
        <>
          <p className="tag">
            <span>{criKeyword[0]}</span>을 <span>{key}</span> 기준으로 검색한
            내용입니다.
          </p>
          <DrugList
            columns={columns.slice(1, 6)}
            data={renderingData.filter((item) => {
              return searchResults.includes(item.drugId);
            })}
            onQuantityChange={handleQuantityChange}
          />
        </>
      ) : (
        <NoResultView
          name={criKeyword[0]}
          explain={"과 일치하는 내용이 없습니다."}
        />
      )}
    </>
  );

  return !loading ? (
    <>
      <HeaderComponent
        nav={navigate}
        isLogoutVisible={true}
        acitveTab={"drugs"}
      />
      <div className="ui-panel-container">
        <FileUpload Uploading={ReadJsonDrugs} />
        <SearchBar search={search} currentPage={"Drugs"} />
      </div>
      {drugView}
      <div className="drugButtons-container">
        <div className="left-btn">
          <button onClick={generateExcel}>엑셀파일 다운로드</button>
        </div>
        <div className="right-btns">
          <button onClick={handleInitialized}>변경사항 초기화</button>
          <button onClick={UpdateDrugs}>변경사항 저장</button>
        </div>
      </div>
    </>
  ) : (
    <div className="loading-wrapper">
      <img src="/icons/ic_spinner.gif" alt="" />
    </div>
  );
};

export default Drugs;
