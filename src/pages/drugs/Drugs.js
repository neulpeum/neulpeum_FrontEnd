import React, { useState, useEffect } from 'react';
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
            setCurrentDrugsData(response.data);
            console.log("약 재고가 성공적으로 업데이트되었습니다.");
        })
        .catch (error => {
            console.log(error, error.response, error.request);
        })
    }
    // [
    //     {
    //         "drugId": 1,
    //         "drugName": "타이레놀",
    //         "expireDate": "2025-01-27",
    //         "usableAmount" : 100
    //     },
    //     {
    //         "drugId": 2,
    //         "drugName": "타이레놀",
    //         "expireDate": "2025-06-29",
    //         "usableAmount" : 100
    //     },
    //     {
    //         "drugId": 3,
    //         "drugName": "타이레놀",
    //         "expireDate": "2025-11-28",
    //         "usableAmount" : 100
    //     },
    //     {
    //         "drugId": 4,
    //         "drugName": "비타민",
    //         "expireDate": "2026-06-29",
    //         "usableAmount" : 100
    //     },
    //     {
    //         "drugId": 5,
    //         "drugName": "비타민",
    //         "expireDate": "2026-11-28",
    //         "usableAmount" : 100
    //     },
    //     {
    //         "drugId": 6,
    //         "drugName": "비타민",
    //         "expireDate": "2027-11-28",
    //         "usableAmount" : 100
    //     },
    //     {
    //         "drugId": 7,
    //         "drugName": "루테인",
    //         "expireDate": "2026-11-28",
    //         "usableAmount" : 100
    //     },
    //     {
    //         "drugId": 8,
    //         "drugName": "테스트",
    //         "expireDate": "2025-11-28",
    //         "usableAmount" : 30
    //     }
    // ]

    const handleQuantityChange = (index, change) => {
        setCurrentDrugsData(prevData => {
            const newData = [...prevData];
            newData[index].usableAmount += change;
            return newData;
        })
    }

    // axios.patch(url, body)
    //     .then((res) => {
    //         setCurrentPassword('');
    //         setNewPassword('');
    //         setConfirmNewPassword('');
    //     })
    //     .catch((error) => {
    //         if (error.code === "ERR_BAD_RESPONSE") {
    //             setCurrentPassword('');
    //             setError(error);
    //         } else {
    //             console.error(error); // 예상치 못한 에러 발생시
    //         }
    //     });
    useEffect(() => {
        if (!originalDrugs) {
            axios.get("http://52.78.35.193:8080/api/drug")
            .then((res) => {
                const data = res.data;
                setOriginalDrugs(data);
                setCurrentDrugsData(data);
            })
            .catch((error) => {
                if (error.code === "Bad Request") {
                    alert('잘못된 요청입니다.', error);
                } else {
                    console.error(error);
                }
            })
        }
    }, [originalDrugs]); // 원본 데이터가 변경될경우 다시 서버에서 받아온다고? 근데 그건 백엔드쪽이지 프론트쪽이아니잖아?


    function CreateBtn() {
        return(
            <DrugsStyledBtn onClick={UpdateDrugs}>변경사항 저장</DrugsStyledBtn>
        )
    }
    // const search = (keyword, criteria) => {
    //     if (criteria) {
    //         originalDrugs.forEach((item))
    //     }
    // };
    
    // const search = (keyword, criteria) => {
    //     if (criteria) {
    //       data.forEach((item) => {
    //         if (item[criteria] && item[criteria].includes(keyword)) {
    //           setGlobalFilter(keyword);
    //         } else {
    //           setCriKeryword(keyword);
    //           setGlobalFilter("朴");
    //         }
    //       });
    //     } else {
    //       setGlobalFilter(keyword);
    //     }
    //   };
    return (
        <>
            <HeaderComponent />
            <UiPanelContainer>
                <FileUpload UploadedFile={ReadJsonDrugs}/>
                <SearchBar search={null} currentPage={"Drugs"} />
            </UiPanelContainer>
            < DrugList columns={columns} data={currentDrugsData}savebtn={CreateBtn}/> 
            {console.log(currentDrugsData)}
        </>
    );
};

export default Drugs;