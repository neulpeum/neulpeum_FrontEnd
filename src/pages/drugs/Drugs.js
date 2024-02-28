import React, { useState } from 'react';
import styled from 'styled-components';
import DrugList from '../../components/drugList/DrugList';
import HeaderComponent from '../../components/header/Header';
import SearchBar from '../../components/searchbar/SearchBar';
import FileUpload from '../../components/fileupload/FileUpload';

const DrugsTableStyledBtn = styled.button`
    width: 25px;
    height: 25px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 50%;
    color: white;
    background-color: #AED391;
    border: none;
    cursor: pointer;
`
const DrugsStyledBtn = styled(DrugsTableStyledBtn)`
    width: 192px;
    height: 48px;
    position: absolute;
    top: 362px;
    left: 1058px;
    border-radius: 5px;
`
const testContainer = styled.div`
    width: 1120px;
    height: 545px;
    position: absolute;
    top: 440px;
    left: 152px;
`
const Drugs = () => {

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
                    <DrugsTableStyledBtn onClick={() => handleQuantityChange(row.index, 1) }>+</DrugsTableStyledBtn>
                    {row.values.usableAmount}
                    <DrugsTableStyledBtn onClick={() => handleQuantityChange(row.index, -1) }>-</DrugsTableStyledBtn>
                </div>
            )
        },
        {Header: "등록일자", accessor: 'drugEnrollDate'},
        {Header: "수정일자", accessor: 'drugModifyDate'},
    ];

    return (
        // 약 재고 조회 GET 요청 url 주소: /api/drug
        // 약 재고 검색 GET 요청 url 주소: /api/findDrug?drugName=타이레놀 :: Request 형태
        <>
            < HeaderComponent />
            <FileUpload onFileSaveClick={setTransmittedData}/>
            <SearchBar currentPage={'Drugs'}/>
            <DrugsStyledBtn>변경사항 저장</DrugsStyledBtn>
            {/* < DrugList columns={columns} data={drugsData} /> */}
        </>
    );
};

export default Drugs;