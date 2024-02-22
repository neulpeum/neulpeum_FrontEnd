import React, { useState } from 'react';
import DrugList from '../../components/drugList/DrugList';
import HeaderComponent from '../../components/header/Header';
import SearchBar from '../../components/searchbar/SearchBar';
import FileUpload from '../../components/fileupload/FileUpload';

const Drugs = () => {

    const btnStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        borderRadius: '50%',
        color: 'white',
        backgroundColor: '#aed391',
        leftPadding: '5px',
        rightPadding: '5px',
        cursor: 'pointer',
        border: 'none',
      };

    const [drugsData, setDrugsData] = useState([
        { drugName:'타이레놀', expireDate: "2025-01-27", usableAmount: 30, 
        drugEnrollDate: "2024-01-27", drugModifyDate:"2024-01-27" },
        { drugName:'타이레놀', expireDate: "2025-01-27", usableAmount: 30, 
        drugEnrollDate: "2024-01-27", drugModifyDate:"2024-01-27" },
    ])

    const setTransmittedData = (drugsfile) => {
        console.log(drugsfile); // 1. 전송된 drugfile의 데이터를 추출해 2. drugsData에 저장하는 로직 구현이 필요함
    }

    const handleQuantityChange = (index, change) => {
        setDrugsData(prevData => {
            const newData = [...prevData];
            newData[index].usableAmount += change;
            return newData;
        })
    }

    const columns = [
        { Header: "약 이름", accessor: 'drugName'},
        { Header: "유통기한", accessor: 'expireDate'},
        { Header: "남은 재고", accessor: 'usableAmount',
            Cell: ({ row }) => (
                <div style={{ display: "flex", alignItems:'center'}}>
                    <button style={btnStyle} onClick={() => handleQuantityChange(row.index, 1) }>+</button>
                    {row.values.usableAmount}
                    <button style={btnStyle} onClick={() => handleQuantityChange(row.index, -1)}>-</button>
                </div>
            )
        },
        {Header: "등록일자", accessor: 'drugEnrollDate'},
        {Header: "수정일자", accessor: 'drugModifyDate'},
    ];

    return (
        // 약 재고 조회 GET 요청 url 주소: /api/drug
        // 약 재고 검색 GET 요청 url 주소: /api/findDrug?drugName=타이레놀 :: Request 형태
        <div>
            < HeaderComponent />
            <FileUpload onFileSaveClick={setTransmittedData}/>
            <SearchBar currentPage={'Drugs'}/>
            < DrugList columns={columns} data={drugsData} />
        </div>
    );
};

export default Drugs;