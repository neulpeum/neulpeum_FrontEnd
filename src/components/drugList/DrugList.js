import React, { useEffect } from "react";
import { useTable } from "react-table";
// import 'jsgrid/dist/jsgrid.min.css';
// import 'jsgrid/dist/jsgrid-theme.min.css';
// import $ from 'jquery';

const DrugList = ({ columns, data }) => {

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  // useEffect(() => {
  //   // jsGrid 초기화
  //   $('#jsGrid').jsGrid({
  //     width: '100%',
  //     sorting: true,
  //     paging: true,
  //     data,
  //     fields: columns.map((column) => ({
  //       name: column.accessor,
  //       title: column.Header,
  //       type: column.type || 'text',
  //     })),
  //   });
  // }, [columns, data]);

  return (
    <div className="Drugtable-wrapper">
      <table {...getTableProps()} className="Drugtable">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="Drugtable-row">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="Drugtable-header">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()} className="Drugtable-row">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="Drugtable-cell">
                      {cell.render('Cell')}
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
  
export default DrugList;