import React, { useState, useRef } from 'react';
import styled from 'styled-components';

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
const FileUpload = ({ onFileSaveClick } ) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // 이미지 클릭 시 input 엘리먼트 클릭
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 파일 유효성 검사
  const handleFile = (selectedFile) => { 
    const allowedExtensions = ['.xlsx', '.xls'];

    const fileExtension = selectedFile.name.split('.').pop();

    if (allowedExtensions.includes('.' + fileExtension.toLowerCase())) {
      setSelectedFile(selectedFile);

      alert("파일이 선택되었습니다.");
    }
    else alert('액셀 파일만 업로드 가능합니다.');
  };

  // 파일 탐색 후 선택 업로드
  const onSelectFile = (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files.length === 1) {
      const selectedFile = files[0];
      handleFile(selectedFile);
    } else { 
      alert("2개 이상의 파일은 허용되지 않습니다.");
    }
  };

  // [파일 저장]버튼이 눌린뒤 Drugs로 전송함
  const transmitDrugsData = (data) => {
    if (data !== null) onFileSaveClick(data);
    else alert("현재 업로드된 파일이 없습니다.");
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
        accept=".xlsx, .xls" // 액셀 파일 확장자만 허용
        onChange={onSelectFile}
        id="file-input-container"
      />
      {selectedFile ? (
        <UploadLabel htmlFor='file-input-container'>선택된 파일: {selectedFile.name}</UploadLabel>
      ) : (
        <UploadLabel htmlFor='file-input-container'>액셀 파일을 업로드하세요</UploadLabel>
        )
      }
      <UploadBtn onClick={() => transmitDrugsData(selectedFile)}>업로드</UploadBtn>
    </UploadContainer>
  );
};

export default FileUpload;
