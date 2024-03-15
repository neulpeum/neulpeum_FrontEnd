import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

const UploadContainer = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.5rem;
  padding: 11px 14px;
  border: 1px solid black;
`
const UploadImg = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  vertical-align: middle;
`
const UploadSpan = styled.span`
  font-size: 20px;
  position: absolute;
  left: 54px;
  top: 17px;
`
const UploadLabel = styled.label`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
`
const UploadBtn = styled.button`
  width: 104px;
  height: 37px;
  font-size: 20px;
  align-self: flex-end;
  color: white;
  background-color: #aed391;
  border: 0px;
  border-radius: 5px;
  cursor: pointer;
`
const FileUpload = ({ UploadedFile } ) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const onhandleFile = async (file) => {
    try {
        const workbook = await readExcelFile(file);
        const tableData = extractSheetData(workbook);
        setConvertedFile(tableData);
    } catch (error) {
      console.error('엑셀 파일을 읽는 중 에러가 발생했습니다.:', error);
    }
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        resolve(workbook);
      };

      reader.onerror = (error) => {
        console.log(error);
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const extractSheetData = (workbook) => {
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

    return sheetData;
  };

  const onSelectFile = async (event) => {
    const file = (event.target.files.length === 1) ? event.target.files[0] : null;
    if (file) {
      const fileExtension = file.name.split('.').pop();
      const allowedExtensions = ['.xlsx', '.xls'];
      if (allowedExtensions.includes('.' + fileExtension.toLowerCase())) {
        try {
          setSelectedFile(file);
          onhandleFile(file, event);
        }
        catch (error) {
          console.log(error);
        }
      } else alert('파일 형식이 .xlsx, .xls 만 허용됩니다.');
    } else return(alert('파일이 등록되지 않았습니다.'));
  };

  const transmitDrugsData = (file) => {
    if (file) {UploadedFile(file);}
    else alert("현재 업로드된 파일이 없습니다. 파일을 선택하고 업로드한 후 시도해주세요.");
  }

  return (
    <UploadContainer>
      <UploadImg
        src="/icons/ic_fileImg.svg"
        alt="파일 아이콘 이미지"
        onClick={handleImageClick}
      />
      <UploadSpan>파일 선택</UploadSpan>
      
      <input
        ref={fileInputRef}
        name="FileUploadInput"
        type="file"
        style={{ display: "none" }}
        accept=".xlsx, .xls"
        onChange={onSelectFile}
        id="file-input-container"
      />
      <UploadLabel htmlFor='file-input-container'>
        {selectedFile ? `선택된 파일: ${selectedFile.name}` : '액셀 파일을 업로드하세요'}
      </UploadLabel>
      <UploadBtn onClick={() => transmitDrugsData(convertedFile)}>업로드</UploadBtn>
    </UploadContainer>
  );
};

export default FileUpload;
