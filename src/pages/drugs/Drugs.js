import React, { useState, useEffect } from 'react';
import {useTable} from 'react-table';
import styled from 'styled-components';
import axios from 'axios';
import * as XLSX from 'xlsx';
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
    font-size: 24px;
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
`
const Drugs = () => {
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
        {Header: "마지막 사용 일자", accessor: 'drugModifiedTime', type: 'text'},
    ];
    // 서버 ip 주소: http://52.78.35.193:8080
    // 약 재고 업데이트 PUT 요청 url 주소: /api/drug

    const [isReversed, setReverse] = useState(false);
    function sortDrugsData() {
        setCurrentDrugsData(prevData => [...prevData].sort((a, b) => {
            if (isReversed) {
                return b.expireDate.localeCompare(a.expireDate);
              } else {
                return a.expireDate.localeCompare(b.expireDate);
              }
        }))
        setReverse(!isReversed);
    };

    const ReadJsonDrugs = (jsonDrugs) => {
        // slice(1) 를 통해 엑셀의 헤더부분을 제외하고 mapping하는 작업을 했지만... 왠지 모르게 불만족스럽다. 
        // 더 정교하게 설계해야겠다.
        const FormattedDrugs = jsonDrugs.slice(1).map((row, index) => {
            const [drugName, expireDate, usableAmount, drugEnrollTime, drugModifiedTime] = row;

            return {
                drugName: drugName,
                expireDate: ConvertedDate(expireDate),
                usableAmount: usableAmount,
                drugEnrollTime: ConvertedDate(drugEnrollTime),
                drugModifiedTime: ConvertedDate(drugModifiedTime),
              };
        });
        setCurrentDrugsData(FormattedDrugs);
    }

    // 엑셀 형식 Date -> json 형식 Date : 변환
    function ConvertedDate(excelDate) {
        // 엑셀 날짜의 기준일 (1900년 1월 0일)
        const baseDate = new Date(1899, 11, 30);
        // 엑셀 날짜에 해당하는 밀리초 계산
        const milliseconds = excelDate * 24 * 60 * 60 * 1000;
        const jsDate = new Date(baseDate.getTime() + milliseconds);
        const formattedDate = jsDate.toISOString().split('T')[0];
        return formattedDate;
    }

    async function UpdateDrugs()  {
        if (!originalDrugs) return;
        await axios.get("http://52.78.35.193:8080/api/drug")
        .then (response => {
            setOriginalDrugs(response.data);
            console.log("약 재고가 성공적으로 업데이트되었습니다.");
        })
        .catch (error => {
            console.log(error, error.response, error.request);
        })
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
        fetchDrugs();
    }, [originalDrugs]); // 원본 데이터가 변경될경우 다시 서버에서 받아온다고? 근데 그건 백엔드쪽이지 프론트쪽이아니잖아?


    function CreateBtn() {
        return(
            <DrugsStyledBtn onClick={UpdateDrugs}>변경사항 저장</DrugsStyledBtn>
        )
    }
    // 아래에 DrugList는 현재 화면에 보여줘야할 data를 집어넣어야만한다
    return (
        <>
            <HeaderComponent />
            <UiPanelContainer>
                <FileUpload UploadedFile={ReadJsonDrugs}/>
                <SearchBar 
                search={null}
                currentPage={"Drugs"} 
                />
            </UiPanelContainer>
            < DrugList 
            columns={columns} 
            data={currentDrugsData}
            savebtn={CreateBtn}
            /> 
        </>
    );
};

export default Drugs;