import React from 'react';
import { useTable } from 'react-table';
import './CitizenList.css';

const CitizenList = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="table-wrapper">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="table-row">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="table-header">
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
                <tr {...row.getRowProps()} className="table-row">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="table-cell">
                      {cell.column.id === 'action' ? (
                        <button onClick={() => alert('조회 버튼 눌림')}>조회 {'>'}</button>
                      ) : (
                        cell.render('Cell')
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