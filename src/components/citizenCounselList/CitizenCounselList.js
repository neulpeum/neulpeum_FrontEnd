import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { useFilter } from "@promise_learning/usefilter";
import axios from "axios";
import ConsultModal from "../consultModal/ConsultModal";
import Search from "../../search/Search";
import NoResultView from "../noResult/NoResult";

export default function CitizenCounselList() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [consultId, setConsultId] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const patientId = location.state.id;

  useEffect(() => {
    getName();
    getData();
  }, []);

  const getName = async () => {
    try {
      const response = await axios.get(
        `http://52.78.35.193:8080/api/patientInfo?patientId=${patientId}`
      );
      setName(response.data.patientName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://52.78.35.193:8080/api/patient/consult?patientId=${patientId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const search = (keyword, criteria) => {
    // console.log("key", keyword);
    // console.log("cri", criteria);

    setGlobalFilter(keyword);

    // const searchData = {
    //   query: { keyword },
    //   fields: { criteria },
    // };

    // const filtersData = {
    //   category: [],
    // };

    // const { data: result } = useFilter({
    //   data,
    //   search: searchData,
    //   filters: filtersData,
    // });

    // setData(result);

    // setGlobalFilter(keyword, criteria); // 전역 필터링 적용

    // 검색 기준이 없으면 전체를 기준으로 사용
    // const filterCriteria = criteria ? criteria : "consultDate";

    // // 데이터 필터링
    // const filteredData = data.filter((row) =>
    //   row[filterCriteria].toLowerCase().includes(keyword.toLowerCase())
    // );

    // // 필터된 데이터 업데이트
    // setData(filteredData);
  };

  const columns = useMemo(
    () => [
      {
        accessor: "consultDate",
        Header: "방문날짜",
      },
      {
        accessor: "providerName",
        Header: "상담자(대학생)",
      },
      {
        accessor: "takingDrug",
        Header: "제공 otc",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const sortSytle = {
    fontSize: "0.8rem",
    marginLeft: "0.3rem",
  };

  const openModal = (btnConsultId) => {
    setConsultId(btnConsultId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style = "overflow: auto";
  };

  const CitizenCounsels = () => {
    return (
      <div className="list-wrapper">
        <table {...getTableProps()} className="counselTable">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span style={sortSytle}>▼</span> // 내림차순 화살표
                      ) : (
                        <span style={sortSytle}>▲</span> // 오름차순 화살표
                      )
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      onClick={() => openModal(cell.row.original.consultId)}
                      {...cell.getCellProps()}
                    >
                      {cell.column.id === "takingDrug" ? (
                        <div className="DetailButtonContainer">
                          <a>{cell.row.values["takingDrug"]}</a>
                          <a className="DetailButton">{">"}</a>
                        </div>
                      ) : cell.column.id === "consultDate" ? (
                        <div>
                          {cell.row.values["consultDate"]
                            .split(" ")
                            .map((value, index) => (
                              <p key={index} style={{ margin: "0" }}>
                                {value}
                              </p>
                            ))}
                        </div>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {isOpen && consultId && (
          <ConsultModal onClose={closeModal} consultId={consultId} />
        )}
      </div>
    );
  };

  const keyword = state["globalFilter"];
  const noResultView =
    rows.length === 0 && keyword && keyword !== "" ? (
      <NoResultView name={keyword} explain={"과 일치하는 내용이 없습니다."} />
    ) : (
      <CitizenCounsels />
    );

  return (
    <div className="citizenCounselList-wrapper">
      <div className="counselList-wrapper">
        <div className="ment-wrapper">
          <p className="citizenName">{name}</p>
          <p className="citizensCounList">님의 상담 리스트</p>
        </div>
        <div className="searchBar-wrapper">
          <Search onSubmit={search} />
          <Link
            to="/addcounsel"
            state={{
              patientId: `${patientId}`,
              patientName: `${name}`,
            }}
          >
            <img
              src="/icons/ic_counselWrite.svg"
              alt="추가"
              className="write-img"
            />
          </Link>
        </div>
        {noResultView}
      </div>
    </div>
  );
}
