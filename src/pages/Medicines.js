import React from "react";
import FileUploader from "../components/fileuploader/FileUploader";
import MedicineList from "../components/medicineList/MedicineList";


const Medicines = () => {
    const columns = [
        {Headers: "약 이름", accesor: 'medicine_name'},
        {Headers: "유통기한", accesor: 'expiration_date'},
        {Headers: "남은 재고", accesor: 'current_quantity'},
        {Headers: "등록일자", accesor: 'registration_date'},
        {Headers: "수정일자", accesor: 'revision_date'}
    ];
    const dummyData = [
        { medicine_name:"타이레놀", expiration_date:365, current_quantity: 3, 
        registration_date: "2024년", revision_date:"2025년" }
        // TODO(데이터 로드해서 동적으로 CitizenList에 전달하기)
    ]
    return (
        <div>
            <FileUploader/>
            <MedicineList columns={columns} data={dummyData} />
        </div>
    )
}

export default Medicines;