import React from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import 'styles/ForPages/Citizens/CitizenList.css';

const CitizenList = ({ columns, data, onClickDetail }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data, maxMultiSortColCount: 2, isMultiSortEvent: () => true },
      useGlobalFilter,
      useSortBy
    );

  const sortSytle = {
    fontSize: "0.8rem",
    marginLeft: "0.3rem",
  };

  return (
    <div className="table-wrapper">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="table-row">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="table-header"
                >
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
              <tr
                {...row.getRowProps()}
                className="table-row"
                onClick={() => onClickDetail(row.original.patientId)}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="table-cell">
                    {cell.column.id === "specialReport" ? (
                      <div className="DetailButtonContainer">
                        <a> {cell.row.values["specialReport"]} </a>
                        <a className="DetailButton"> {">"} </a>
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
    </div>
  );
};

export default CitizenList;