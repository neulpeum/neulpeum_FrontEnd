import React, { useState } from "react";

export default function CitizenCounselList() {
  const data = [
    {
      id: 1,
      col1: "1",
      col2: "김xx",
      col3: "두통약",
      col4: "2024.01.05",
    },
    {
      id: 2,
      col1: "2",
      col2: "김xx",
      col3: "두통약",
      col4: "2024.01.05",
    },
    {
      id: 3,
      col1: "3",
      col2: "김xx",
      col3: "두통약",
      col4: "2024.01.05",
    },
    {
      id: 4,
      col1: "4",
      col2: "김xx",
      col3: "두통약",
      col4: "2024.01.05",
    },
    {
      id: 5,
      col1: "5",
      col2: "김xx",
      col3: "두통약",
      col4: "2024.01.05",
    },
    {
      id: 6,
      col1: "6",
      col2: "김xx",
      col3: "두통약",
      col4: "2024.01.05",
    },
    {
      id: 7,
      col1: "7",
      col2: "김xx",
      col3: "두통약",
      col4: "2024.01.05",
    },
    {
      id: 8,
      col1: "8",
      col2: "김xx",
      col3: "두통약",
      col4: "2024.01.05",
    },
    {
      id: 9,
      col1: "9",
      col2: "김xx",
      col3: "두통약",
      col4: "2024.01.05",
    },
    {
      id: 10,
      col1: "10",
      col2: "김xx",
      col3: "두통약",
      col4: "2024.01.05",
    },
    {
      id: 11,
      col1: "11",
      col2: "김xx",
      col3: "두통약",
      col4: "2024.01.05",
    },
  ];

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="citizenCounselList-wrapper">
      <div className="counselList-wrapper">
        <div className="ment-wrapper">
          <p className="citizenName">홍xx</p>
          <p className="citizensCounList">님의 상담 리스트</p>
        </div>
        <div className="searchBar-wrapper">
          <input
            type="text"
            // placeholder="해야 할 일을 입력하세요."
            className="searchBar"
            value={value}
            onChange={handleChange}
          ></input>
          <img
            src="/icons/ic_counSearch.svg"
            alt="검색"
            className="search-img"
          />
          <img src="/icons/ic_counSort.svg" alt="정렬" className="sort-img" />
          <img
            src="/icons/ic_counselWrite.svg"
            alt="추가"
            className="write-img"
          />
        </div>
        <div className="list-wrapper">
          <table className="counselTable">
            <thead>
              <tr>
                <th>번호</th>
                <th>상담자(대학생)</th>
                <th>제공 otc</th>
                <th>방문날짜</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.col1}</td>
                  <td>{item.col2}</td>
                  <td>{item.col3}</td>
                  <td>{item.col4}</td>
                  <td>
                    <button className="inquiry-btn">조회 &gt; </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
