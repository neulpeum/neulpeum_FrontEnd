import React, { useState } from 'react';
import MedicineList from '../../components/medicineList/MedicineList';
import FileUplaod from '../../components/fileupload/FileUpload';
import SearchBar from '../../components/searchbar/SearchBar';
import HeaderComponent from '../../components/header/Header';

const Medicines = () => {
    // TODO(데이터 로드해서 동적으로 MedicineList에 전달하기)
    const [medicinesData, setMedicinesData] = useState([
        { drugName:'타이레놀', expireDate: "2025-01-27", usableAmount: 30, 
        drugEnrollDate: "2024-01-27", drugModifyDate:"2024-01-27" },
    ])

    const columns = [
        { Header: "약 이름", accessor: 'drugName'},
        { Header: "유통기한", accessor: 'expireDate'},
        { Header: "남은 재고", accessor: 'usableAmount',
            Cell: ({ row }) => (
                <div style={{ display: "flex" }}>
                    <span onClick={() => handleQuantityChange(row.index, 1)}>+</span>
                    {row.values.usableAmount}
                    <span onClick={() => handleQuantityChange(row.index, -1)}>-</span>
                </div>
            )
        },
        {Header: "등록일자", accessor: 'drugEnrollDate'},
        {Header: "수정일자", accessor: 'drugModifyDate'},
    ];

    const handleQuantityChange = (index, change) => {
        setMedicinesData(prevData => {
            const newData = [...prevData];
            newData[index].usableAmount += change;
            return newData;
        })
    }

    return (
        <div>
            < HeaderComponent />
            < FileUplaod/>
            < SearchBar/>
            < MedicineList columns={columns} data={medicinesData} />
        </div>
    );
};

export default Medicines;