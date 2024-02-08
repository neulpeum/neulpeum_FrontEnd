import React, {useState} from 'react';

const FileUpload = () => {
  // 화면에 랜더링할 파일
  const {selectedFile, setSeletecFile} = useState(null);

  const handleFile = (selectedFile) => {
    const allowedExtensions = ['.xlsx', '.xls'];

    const fileExtension = selectedFile.name.split('.').pop();

    if (allowedExtensions.includes('.' + fileExtension.toLowerCase())) {
      alert('액셀 파일이 선택되었습니다. 파일명: ' + selectedFile.name);
      setSeletecFile(selectedFile);
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

    if (files.length === 1) {
      const selectedFile = files[0];
      handleFile(selectedFile);
    }
  };

  const handleFileInputChange = (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files.length === 1) {
      const selectedFile = files[0];
      handleFile(selectedFile);
    }
  };

  return (
    <div className="upload-container">
      <div className='upload-tag-container'>
        <img src="/icons/ic_fileImg.svg"alt='파일 아이콘' className='ic-file' id='ic-file'/>
        <label htmlFor='ic-file' className='ic-file-label'>파일 선택</label>
      </div>

      <div className='file-input-container' onDragOver={handleDragOver} onDrop={handleDrop} id='file-input'>
        <input
        type="file"
        style={{display:'none'}}
        accept=".xlsx, .xls" // 액셀 파일 형식만 업로드 허용
        onChange={handleFileInputChange}
        />
        <label htmlFor="file-input" className='file-input-label'> 액셀 파일을 업로드하세요 </label>
      </div>
      <button className='save-button'>파일 저장</button>
      
    </div>
  );
};

export default FileUpload;
