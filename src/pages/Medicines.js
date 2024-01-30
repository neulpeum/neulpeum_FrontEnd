import React from 'react';
import MedicineList from '../components/medicineList/MedicineList';
import FileUplaod from '../components/fileupload/FileUpload';
import SearchBar from '../components/searchbar/SearchBar';

const Medicines = () => {
    const columns = [
        {Header: "약 이름", accessor: 'medicine_name'},
        {Header: "유통기한", accessor: 'expiration_date'},
        {Header: "남은 재고", accessor: 'current_quantity', Add: () => Data.current_quantity++, Subtraction: () => Data.current_quantity-- },
        {Header: "등록일자", accessor: 'registration_date'},
        {Header: "수정일자", accessor: 'revision_date'},
    ];

    const Data = [
        { medicine_name:'타이레놀', expiration_date: 365, current_quantity: 3, registration_date: '2024년', revision_date:'2025년' },
        // TODO(데이터 로드해서 동적으로 MedicineList에 전달하기)
    ];

    return (
        <div>
            < FileUplaod/>
            < SearchBar/>
            < MedicineList columns={columns} data={Data} />
        </div>
    );
};

export default Medicines;