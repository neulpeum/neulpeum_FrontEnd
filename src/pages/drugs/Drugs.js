import React, { useState, useEffect } from 'react';
import {useTable} from 'react-table';
import styled from 'styled-components';
import axios from 'axios';
import DrugList from '../../components/drugList/DrugList';
import HeaderComponent from '../../components/header/Header';
import SearchBar from '../../components/searchbar/SearchBar';
import FileUpload from '../../components/fileupload/FileUpload';
import NoResultView from '../../components/noResult/NoResult';


const UiPanelContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 11.5%;
    width: 75%;
    height: 12.7%;
    gap: 1rem;
`

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

    // const originalData = [
    //     {drugsId: 1, drugName: '타이레놀', expireDate: '2026-11-28', usableAmount: 100,
    // drugEnrollTime: '2024-02-04', drugModifyTime: '2024-02-18'},
    // ];

    const [originalDrugs, setOriginalDrugs] = useState(null); // 이게 서버에 저장중인 약 데이터
    const [currentDrugsData, setCurrentDrugsData] = useState([]);  // 요게 화면에 랜더링할 약 데이터 Current

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
        {Header: "등록일자", accessor: 'drugEnrollTime', type: 'text'},
        {Header: "수정일자", accessor: 'drugModifyTime', type: 'text'},
    ];
    // 서버 ip 주소: http://52.78.35.193:8080
    // 약 재고 업데이트 PUT 요청 url 주소: /api/drug
    // 약 재고 조회 GET 요청 url 주소: /api/drug
    // 약 재고 검색 GET 요청 url 주소: /api/findDrug?drugName=타이레놀 :: Request 형태
    // axios.get('')

    // 약 재고 조회 GET 요청 시 데이터 형식
    // [
    //     {
    //         "drugId": 1,
    //         "drugName": "타이레놀",
    //         "expireDate": "2025-01-27",
    //         "usableAmount": 100,
    //         "drugEnrollTime": "2024-02-04",
    //         "drugModifiedTime": "2024-02-18"
    //     },
    //     {
    //         "drugId": 2,
    //         "drugName": "타이레놀",
    //         "expireDate": "2025-06-29",
    //         "usableAmount": 100,
    //         "drugEnrollTime": "2024-02-04",
    //         "drugModifiedTime": "2024-02-04"
    //     },
    //     {
    //         "drugId": 3,
    //         "drugName": "타이레놀",
    //         "expireDate": "2025-11-28",
    //         "usableAmount": 100,
    //         "drugEnrollTime": "2024-02-04",
    //         "drugModifiedTime": "2024-02-18"
    //     },
    //         {
    //         "drugId": 4,
    //         "drugName": "비타민",
    //         "expireDate": "2026-06-29",
    //         "usableAmount": 100,
    //         "drugEnrollTime": "2024-02-04",
    //         "drugModifiedTime": "2024-02-18"
    //     },
    //     {
    //         "drugId": 5,
    //         "drugName": "비타민",
    //         "expireDate": "2026-11-28",
    //         "usableAmount": 100,
    //         "drugEnrollTime": "2024-02-04",
    //         "drugModifiedTime": "2024-02-18"
    //     }
    // ]
    // Drugs 페이지 초기화 작업 :: API Method GET <조회>

    const [isReversed, setReverse] = useState(false);
    function sortDrugsData() {
        setCurrentDrugsData(prevData => [...prevData].reverse());
        setReverse(!isReversed);
    };

    // async await 함수를 사용할 때, 
    async function searchDrugsData(keyword) {
        try {
            const data = (await axios.get('/api/findDrug?drugName={타이레놀}')).data;
            setCurrentDrugsData(() => [...originalDrugs].filter((item) => item.drugName.includes(keyword)));
        } catch (error) {
            alert('검색 도중 알 수없는 에러를 감지했습니다' + {error});
        }
    }

    const setNewDrugs = (File) => {
        console.log(File.data);
        //setCurrentDrugsData(File.data);
    }

    const CreateUiPanel = () => {
        return (
            <UiPanelContainer>
                <FileUpload UploadedFile={setNewDrugs}/>
                <SearchBar 
                sort={sortDrugsData} 
                //search={searchDrugsData} 
                currentPage={"Drugs"} 
                isReversed={isReversed} 
                createBtn={<DrugsStyledBtn>변경사항 저장</DrugsStyledBtn>}
                />
            </UiPanelContainer>
        )
    }

    
    const handleQuantityChange = (index, change) => {
        setCurrentDrugsData(prevData => {
            const newData = [...prevData];
            newData[index].usableAmount += change;
            return newData;
        })
    }

    useEffect(() => {
        const fetchDrugs = async () => {
            if (!originalDrugs) {
                try {
                    const response = await axios.get("http://52.78.35.193:8080/api/drug");
                    setOriginalDrugs(response.data);
                    setCurrentDrugsData(response.data);
                } catch (e) {
                    console.log('서버에서 데이터를 GET 하는 중 알 수 없는 에러를 감지했습니다.');
                }
            }
        }
        fetchDrugs(); // 데이터를 가져오는 함수 호출
    }, [originalDrugs]);


    // 아래에 DrugList는 현재 화면에 보여줘야할 data를 집어넣어야만한다
    return (
        <>
            <HeaderComponent />
            <CreateUiPanel />
            < DrugList columns={columns} data={currentDrugsData} /> 
        </>
    );
};

export default Drugs;