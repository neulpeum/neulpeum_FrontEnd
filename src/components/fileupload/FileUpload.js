import React, { useState, useRef } from 'react';

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
    <div className="upload-container">
      <img 
        src="/icons/ic_fileImg.svg"
        alt="파일 아이콘 이미지"
        className="ic-file"
        onClick={handleImageClick}
      />
      <span className='ic-file-span'>파일 선택</span>
      
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
        <label htmlFor='file-input-container' className='upload-container-label'>선택된 파일: {selectedFile.name}</label>
      ) : (
        <label htmlFor='file-input-container' className='upload-container-label' >액셀 파일을 업로드하세요</label>
        )
      }
      
      <button className='file-save-button' onClick={() => transmitDrugsData(selectedFile)}>저장</button>
    </div>
  );
};

export default FileUpload;
