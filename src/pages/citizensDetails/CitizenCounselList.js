import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import axios from "axios";
import ConsultModal from "./ConsultModal";
import Search from "components/Search";
import NoResultView from "components/NoResult";
import "styles/ForPages/CitizensDetails/CitizenCounselList.css";

export default function CitizenCounselList(props) {
  const { onLoadingUpdate } = props;
  const [name, setName] = useState("");
  const [criKeyword, setCriKeryword] = useState("");
  const [data, setData] = useState([]);
  const [consultId, setConsultId] = useState("0");
  const [scrollPosition, setScrollPosition] = useState(0);
  const tableRef = useRef(null);
  const [filterData, setFilterData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const location = useLocation();
  const patientId = location.state.id;
  const navigate = useNavigate();

  useEffect(() => {
    const reloadFlag = localStorage.getItem("isReload");
    if (reloadFlag === "true") {
      setIsReload(true);
      localStorage.setItem("isReload", "false");
    }

    const getData = async () => {
      try {
        onLoadingUpdate(true);
        const response = await axios.get(
          `/api/patient/consult?patientId=${patientId}`
        );
        const reverseData = response.data.slice().reverse();
        setData(reverseData);
        setFilterData(reverseData);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          alert("접근 권한이 없습니다");
          navigate(-1);
          return;
        }
        console.error("Error fetching data:", error);
      } finally {
        onLoadingUpdate(false);
      }
    };
    const getName = async () => {
      try {
        const response = await axios.get(
          `/api/patientInfo?patientId=${patientId}`
        );
        setName(response.data.patientName);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          alert("접근 권한이 없습니다");
          navigate(-1);
          return;
        }
        console.error("Error fetching data:", error);
      }
    };
    getName();
    getData();
  }, [navigate, patientId]);

  useEffect(() => {
    if (isReload) {
      setIsReload(false);
      window.location.reload();
    }
  }, [isReload]);

  const search = (keyword, criteria) => {
    const results = [];
    if (criteria) {
      data.forEach((item) => {
        if (criteria === "consultedAt") {
          const datePart = item["consultedAt"].split(" ")[0];
          if (datePart.includes(keyword)) {
            results.push(item);
          }
        } else if (item[criteria] && item[criteria].includes(keyword)) {
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
      data.forEach((item) => {
        if (item["consultedAt"].includes(keyword)) {
          const datePart = item["consultedAt"].split(" ")[0];
          if (datePart.includes(keyword)) {
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
  };

  const columns = useMemo(
    () => [
      {
        accessor: "consultedAt",
        Header: "방문날짜",
      },
      {
        accessor: "providerName",
        Header: "상담자",
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
  } = useTable(
    {
      columns,
      data: filterData,
      maxMultiSortColCount: 2,
      isMultiSortEvent: () => true,
    },
    useGlobalFilter,
    useSortBy
  );

  const sortSytle = {
    fontSize: "0.8rem",
    marginLeft: "0.3rem",
  };

  const openModal = (btnConsultId) => {
    setConsultId(btnConsultId);
    setIsOpen(true);
    if (tableRef.current) {
      setScrollPosition(tableRef.current.scrollTop);
    }
  };

  const closeModal = (boolean) => {
    if (boolean) {
      setIsReload(boolean);
    }
    setIsOpen(false);
    document.body.style = "overflow: auto";
  };

  useEffect(() => {
    if (!isOpen) {
      if (tableRef.current) {
        tableRef.current.scrollTo(0, scrollPosition);
      }
    }
  }, [isOpen, scrollPosition]);

  const CitizenCounsels = () => {
    return (
      <div ref={tableRef} className="list-wrapper">
        <table {...getTableProps()} className="counselTable">
          <colgroup>
            <col style={{ width: "10rem" }} />
            <col style={{ width: "10rem" }} />
            <col style={{ width: "12rem" }} />
          </colgroup>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div>
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
                    </div>
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
                          <div className="conselTakingDrug-wrapper">
                            {cell.row.values["takingDrug"] &&
                              cell.row.values["takingDrug"]
                                .split(", ")
                                .map((item, index) => (
                                  <p
                                    key={index}
                                    style={{
                                      margin: "0 0 0.1rem 0",
                                      width: "fit-content",
                                    }}
                                  >
                                    {item}
                                  </p>
                                ))}
                          </div>
                          <button
                            className="DetailButton"
                            style={{
                              cursor: "pointer",
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            {">"}
                          </button>
                        </div>
                      ) : cell.column.id === "consultedAt" ? (
                        <div>
                          {cell.row.values["consultedAt"]
                            .split(" ")
                            .map((value, index) => (
                              <p key={index} style={{ margin: "0" }}>
                                {index === 1 ? `(${value})` : value}
                              </p>
                            ))}
                        </div>
                      ) : (
                        <div style={{ padding: "0 10px" }}>
                          {cell.render("Cell")}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {isOpen && consultId && (
          <ConsultModal
            onClose={closeModal}
            consultId={consultId}
            patientId={patientId}
          />
        )}
      </div>
    );
  };

  const keyword = state["globalFilter"];
  const noResultView =
    criKeyword && filterData.length === 0 ? (
      <NoResultView
        name={criKeyword}
        explain={"과 일치하는 내용이 없습니다."}
      />
    ) : rows.length === 0 && keyword && keyword !== "" ? (
      <NoResultView name={keyword} explain={"과 일치하는 내용이 없습니다."} />
    ) : (
      <CitizenCounsels />
    );

  return (
    <div className="citizenCounselList-wrapper">
      <div className="counselList-wrapper">
        <div className="ment-wrapper">
          <p className="citizenName">
            {name} <span className="citizensCounList">님의 상담 리스트</span>
          </p>
        </div>
        <div className="searchBar-wrapper">
          <Search onSubmit={search} />
        </div>
        {noResultView}
      </div>
    </div>
  );
}
