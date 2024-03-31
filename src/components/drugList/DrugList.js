import React from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

const DrugList = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
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

  function FormatDate(date) {
    if (date === null) {
      return <>아직 사용되지 않았습니다.</>;
    }
    const dateFormatRegex = /^\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}$/;
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    if (dateFormatRegex.test(date)) {
      return new Date(date.split(" ")[0]).toLocaleDateString("kr", dateOptions);
    } else {
      return new Date(date).toLocaleDateString("kr", dateOptions);
    }
  }

  return (
    <div className="Drugtable-wrapper">
      <table {...getTableProps()} className="Drugtable">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="Drugtable-row"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="Drugtable-header"
                >
                  <div className="Drugtable-header-container">
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
              <tr {...row.getRowProps()} className="Drugtable-row">
                {row.cells.map((cell) => {
                  if (
                    cell.column.id === "expireDate" ||
                    cell.column.id === "drugEnrollTime" ||
                    cell.column.id === "drugModifiedTime"
                  ) {
                    return (
                      <td className="Drugtable-cell" {...cell.getCellProps()}>
                        {FormatDate(cell.value)}
                      </td>
                    );
                  }
                  return (
                    <td className="Drugtable-cell" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DrugList;
