import React from 'react';

const FileUpload = () => {
  const handleFile = (selectedFile) => {
    const allowedExtensions = ['.xlsx', '.xls'];

    const fileExtension = selectedFile.name.split('.').pop();

    if (allowedExtensions.includes('.' + fileExtension.toLowerCase())) {
      alert('액셀 파일이 선택되었습니다. 파일명: ' + selectedFile.name);
      // 파일 업로드 또는 다른 처리를 수행할 수 있습니다.
    } else {
      alert('액셀 파일만 업로드 가능합니다.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    if (files.length > 0) {
      const selectedFile = files[0];
      handleFile(selectedFile);
    }
  };

  const handleFileInputChange = (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files.length > 0) {
      const selectedFile = files[0];
      handleFile(selectedFile);
    }
  };

  return (
    <div className="upload-container">
      <div className='upload-tag-container'>
        <img src="/icons/ic_fileImg.svg"alt='파일 아이콘' className='ic-file' id='ic-file'/>
        <label htmlFor='ic-file' className='ic-name'>파일 선택</label>
      </div>

      <div className='fileinput-container' onDragOver={handleDragOver} onDrop={handleDrop}>
        <input
        type="file"
        style={{display:'none'}}
        accept=".xlsx, .xls" // 액셀 파일 형식만 업로드 허용
        id="file-input"
        onChange={handleFileInputChange}
        />
        <label htmlFor="file-input" className="fileinput-label"> 액셀 파일을 업로드하세요 </label>
      </div>

      <div className='save-button-container'>
        <button className='save-button'>파일 저장</button>
      </div>
      
    </div>
  );
};

export default FileUpload;
