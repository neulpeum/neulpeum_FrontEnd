import React from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import 'styles/ForPages/Citizens/CitizenList.css';
import ProfileImage from '../../Images/ic_profile.svg';
import ItemBackground from '../../Images/img_citizen_item.svg';
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
    }}>
      <div style={{
        overflow: 'auto',
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
        <div>{text}</div>
      </div>
    </div>
  );
}

function CitizenItem({ profile, name, address, diseases }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-evenly',
    }}>
      <div style={{ 
        position: 'relative',
        width: '400px',
        height: '120px',
        display: 'flex', 
        alignItems: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${ItemBackground})`,
        backgroundSize: '100%',
        backgroundPosition: 'center'
      }}>
        <img src={profile} alt="Profile" style={{ width: '50px', height: '50px', marginRight: '1rem', marginLeft: '1rem'}} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{name}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
            <Item type={"location"} text={address} />
            {diseases.map((disease) => (
              <Item type={"disease"} text={disease} />
            ))}
          </div>
        </div>
        <div style={{
          position: 'absolute',
          right: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          background: 'radial-gradient(circle at center, #fff 42%, #888 100%)',
        }}>
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

  return (
    <div className="citizenTable-wrapper">
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
      <div>
      {
      <div>
        {isMobile && rows.map((citizen) => (
          <CitizenItem
            profile={ProfileImage}
            name="홍길동"
            address="서울시 강남구"
            diseases={['고혈압', '당뇨']}
          />
        ))}
      </div>
      }
    </div>
    </div>
  );
};

export default CitizenList;
