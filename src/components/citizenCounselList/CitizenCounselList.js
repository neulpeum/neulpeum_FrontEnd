import React, { useState } from "react";
import search from "./ic_search.svg";
import sort from "./ic_sort.svg";
import "./CitizenCounselList.css";

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
  ];

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="citizenCounselList-wrapper">
      <div>
        <div className="searchBar-wrapper">
          <input
            type="text"
            // placeholder="해야 할 일을 입력하세요."
            className="searchBar"
            value={value}
            onChange={handleChange}
          ></input>
          <img src={search} alt="검색" className="search-img" />
          <img src={sort} alt="정렬" />
        </div>
        <div className="list-wrapper">
          <table>
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
                    <button className="inquiry-btn">조회 ></button>
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