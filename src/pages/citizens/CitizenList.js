import React from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import 'styles/ForPages/Citizens/CitizenList.css';
import ProfileImage from '../../Images/ic_profile.svg';
import LocationIcon from '../../Images/ic_location.svg';
import DiseaseIcon from '../../Images/ic_plus.svg';
import { useState, useEffect } from 'react';

function Item({ type, text }) {
  const icon = type === 'location' ? LocationIcon : DiseaseIcon;

  return (
    <div style={{ 
      display: 'inline-flex',
      alignItems: 'center',
      marginRight: '10px',
      maxWidth: '200px',
    }}>
      <div style={{
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: '50px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '4px',
        paddingBottom: '4px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #ffffff, #d4d4d4 90%)',
      }}>
        <img src={icon} alt="item" style={{ marginRight: '3px'}} />
        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '13px' }}>{text}</div>
      </div>
    </div>
  );
}

function CitizenItem({ profile, name, address, diseases, onClickDetail }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-evenly',
      marginTop: '20px',
      marginLeft: '40px',
      marginRight: '40px',
      borderRadius: '10px',
      backgroundColor: '#B0D584',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '8px',
      paddingBottom: '8px',
    }}>
      <div style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex', 
        alignItems: 'center',
      }}>
        <img src={profile} alt="Profile" style={{ width: '60px', height: '60px', marginRight: '0.2rem', marginLeft: '0.2rem', marginTop: '0.5rem'}} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{name}</div>
          <div style={{ width:'100%', overflow:'hidden', display: 'flex', justifyContent: 'space-between', marginTop: '6px'}}>
            <Item
              type={"location"}
              text={ address.length > 25 ? `${address.slice(0, 9)}...` : address }
            />
          </div>
          <div style={{ width:'100%', overflow:'hidden', display: 'flex', justifyContent: 'space-between', marginTop: '6px'}}>
            {diseases.length > 0 && <Item type={"disease"} text={diseases[0]} />}
            {diseases.length > 1 && <Item type={"disease"} text={diseases[1]} />}
          </div>
        </div>
        <div style={{
          position: 'absolute',
          right: '-40px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          background: 'radial-gradient(circle at center, #fff 55%, #888 100%)',
        }}
        onClick={onClickDetail}>
          <div>상세정보</div>
        </div>
      </div>
    </div>
  );
}


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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  console.log(rows);

  return (
    <div className="citizenTable-wrapper">
      {isMobile ? (
        <div>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <CitizenItem
                key={row.original.patientId}
                profile={ProfileImage}
                name={row.original.patientName}
                address={row.original.address}
                diseases={row.original.disease.split(", ").slice(0, 2)} 
                onClickDetail={() => onClickDetail(row.original.patientId)}
              />
            );
          })}
        </div>
      ) : (
        <table {...getTableProps()} className="citizenTable">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                    onClick={() => onClickDetail(row.original.patientId)}
                  >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>
                          {cell.column.id === "specialReport" ? (
                            <div className="DetailButtonContainer">
                              <a className="DetailContext"> {cell.row.values["specialReport"]} </a>
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
      )}
    </div>
  );
};

export default CitizenList;
