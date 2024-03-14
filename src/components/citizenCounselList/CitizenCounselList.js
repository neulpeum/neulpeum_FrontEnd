import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import axios from "axios";
import ConsultModal from "../consultModal/ConsultModal";
import Search from "../../search/Search";
import NoResultView from "../noResult/NoResult";

export default function CitizenCounselList() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [consultId, setConsultId] = useState("0");
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

  const columns = useMemo(
    () => [
      {
        accessor: "providerName",
        Header: "상담자",
      },
      {
        accessor: "takingDrug",
        Header: "제공otc",
      },
      {
        accessor: "consultDate",
        Header: "방문날짜",
      },
      {
        accessor: "consultId",
        Header: "",
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

  const [isOpen, setIsOpen] = useState(false);

  const openModal = (btnConsultId) => {
    setConsultId(btnConsultId);
    console.log(btnConsultId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style = "overflow: auto";
  };

  const CitizenCounsels = () => {
    return <div className="list-wrapper">
      <table {...getTableProps()} className="counselTable">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th>번호</th>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                <td>{index + 1}</td>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {cell.column.id === "consultId" ? (
                      <button
                        className="inquiry-btn"
                        onClick={() => openModal(cell.value)}
                      >
                        조회 &gt;
                      </button>
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
  };

  const keyword = state['globalFilter'];
  const noResultView = rows.length === 0 ? <NoResultView name={keyword} explain={"과 일치하는 내용이 없습니다."} /> : <CitizenCounsels />;

  return (
    <div className="citizenCounselList-wrapper">
      <div className="counselList-wrapper">
        <div className="ment-wrapper">
          <p className="citizenName">{name}</p>
          <p className="citizensCounList">님의 상담 리스트</p>
        </div>
        <div className="searchBar-wrapper">
          <Search onSubmit={setGlobalFilter} />
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
