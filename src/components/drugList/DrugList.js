import React from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

const DrugList = ({ columns, data, savebtn }) => {
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

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

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
        <tbody {...getTableBodyProps()} className="Drugtable-cells">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="Drugtable-row">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="Drugtable-cell">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {savebtn()}
    </div>
  );
};

export default DrugList;
