import React from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import 'styles/ForPages/Drugs/DrugList.css';

const DrugList = ({ columns, data, onQuantityChange}) => {
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
                        <span>▼</span> 
                      ) : (
                        <span>▲</span>
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
              
              let rowClassName = 'Drugtable-row';
            if (row.original && row.original.isAdd) {
              rowClassName += " add";  
            }  else if (row.original && row.original.isModified) {
              rowClassName += " modify";
            }

              return (
                <tr {...row.getRowProps()} className={rowClassName}>
                  {row.cells.map(cell => {
                    if (cell.column.id === 'drugModifiedTime' && cell.value === null) {
                      return <td className="Drugtable-cell" {...cell.getCellProps()}>아직 사용되지 않았습니다.</td>;
                    } 
                    else if (cell.column.id === 'usableAmount') {
                      return  <td className="Drugtable-cell" {...cell.getCellProps()}>
                        <div className='usableAmount-cell'>
                          <button onClick={() => {onQuantityChange(row.index, +1)} }>+</button>
                          {cell.render('Cell')}
                          <button onClick={() => {onQuantityChange(row.index, -1)} }>-</button>
                        </div>
                      </td>
                    }
                    return <td className="Drugtable-cell" {...cell.getCellProps()}>{cell.render('Cell')}</td>;
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
