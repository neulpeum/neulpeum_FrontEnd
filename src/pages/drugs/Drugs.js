import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
    margin: 0 7px;
`
const DrugsStyledBtn = styled(DrugsTableStyledBtn)`
    width: 192px;
    height: 48px;
    border-radius: 5px;
    margin: 0;
`
const Drugs = () => {

    const [isReversed, setReverse] = useState(false);

    // 약 재고 업데이트 PUT 요청 url 주소: /api/drug
    // 약 재고 조회 GET 요청 url 주소: /api/drug
    // 약 재고 검색 GET 요청 url 주소: /api/findDrug?drugName=타이레놀 :: Request 형태
    // axios.get('')
    const originalData = [
    { drugName:'타이레놀', expireDate: "2025-01-27", usableAmount: 30, 
    drugEnrollDate: "2024-01-27", drugModifyDate:"2024-01-27" },
    { drugName:'타이레놀', expireDate: "2025-01-27", usableAmount: 30, 
    drugEnrollDate: "2024-01-27", drugModifyDate:"2024-01-27" },
    ];

    const [drugsData, setDrugsData] = useState(originalData);

    const columns = [
        { Header: "약 이름", accessor: 'drugName', type: 'text'},
        { Header: "유통기한", accessor: 'expireDate', type: 'text'},
        { Header: "남은 재고", accessor: 'usableAmount', type: 'int',
            Cell: ({ row }) => (
                <div>
                    <DrugsTableStyledBtn onClick={() => handleQuantityChange(row.index, 1) }>+</DrugsTableStyledBtn>
                    {row.values.usableAmount}
                    <DrugsTableStyledBtn onClick={() => handleQuantityChange(row.index, -1) }>-</DrugsTableStyledBtn>
                </div>
            )
        },
        {Header: "등록일자", accessor: 'drugEnrollDate', type: 'text'},
        {Header: "수정일자", accessor: 'drugModifyDate', type: 'text'},
    ];

    function sortDrugsData() {
        setDrugsData(prevData => [...prevData].reverse());
        setReverse(!isReversed);
    };

    function searchDrugsData(keyword) {
        setDrugsData(() => [...originalData].filter((item) => item.drugName.includes(keyword)));
    }
    const CreateUiPanel = () => {
        return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '0 11.5%', 
            width: '75%', 
            height: '12.7%',
            gap: '1rem'
            }}>
            <FileUpload onFileSaveClick={setTransmittedData}/>
            <SearchBar 
            sort={sortDrugsData} 
            search={searchDrugsData} 
            currentPage={"Drugs"} 
            isReversed={isReversed} 
            createBtn={<DrugsStyledBtn>변경사항 저장</DrugsStyledBtn>}
            />
        </div>
        )
    }

    const handleQuantityChange = (index, change) => {
        setDrugsData(prevData => {
            const newData = [...prevData];
            newData[index].usableAmount += change;
            return newData;
        })
    }
    const setTransmittedData = (drugsfile) => {
        console.log(drugsfile); // 1. 전송된 drugfile의 데이터를 추출해 2. drugsData에 저장하는 로직 구현이 필요함
    }

    return (
        <>
            < HeaderComponent />
            <CreateUiPanel />
            < DrugList columns={columns} data={drugsData} />
        </>
    );
};

export default Drugs;