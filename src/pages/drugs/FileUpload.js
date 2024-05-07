import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import "styles/ForPages/Drugs/FileUpload.css";

// 여기 할거 남아있음. 날짜가 이상한 형식일 경우, 이를테면 33일이라던가, 오늘이 2024년인데 유통기한으로 2023년 이 온다거나
// 일때 업로드 거부할 수 잇도록!
const FileUpload = ({ Uploading } ) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);

  const [isActive, setActive] = useState(false);

  const fileInputRef = useRef();
  const uploadBoxRef = useRef();
  const fileIconRef = useRef();

  const transmitDrugsData = async () => {
    if (convertedFile) await Uploading(convertedFile);
    else alert("현재 업로드된 파일이 없습니다. 파일을 선택하고 업로드한 후 다시 시도해주세요.");
  }
  const clearData = () => {
    setSelectedFile(null);
    setConvertedFile(null);
    alert("업로드가 취소되었습니다.");
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
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const extractSheetData = (workbook) => {
    const sheetName = workbook.SheetNames[0]; //첫번째 시트 페이지
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1});

    const tableData = sheetData.slice(0).filter(row => {
      const isEmptyRow = row.every(cell => cell === null || cell === undefined || cell === '');
      const isPartiallyEmptyRow = row.some(cell => cell === null || cell === undefined || cell === '');
      if (isPartiallyEmptyRow && !isEmptyRow) throw new Error('제출하신 파일에 비어있는 셀이 감지됩니다.');
      return !isEmptyRow;
    });

    setConvertedFile(tableData);
  };

  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const fileInput = fileInputRef.current;
    const fileIcon = fileIconRef.current;
    
    const handleFiles = async (files) => {
      if (files.length > 1) return alert("2개 이상의 파일 업로드는 불가합니다.");
  
      const file = files[0];
      if (file) {
        const fileExtension = file.name.split('.').pop();
        const allowedExtensions = ['.xlsx', '.xls', '.csv'];
  
        if (allowedExtensions.includes('.' + fileExtension.toLowerCase())) {
          try {
            const workbook = await readExcelFile(file);
            extractSheetData(workbook);
            setSelectedFile(file);
            fileInput.value = null;
          } catch (error) {
            alert(error);
          }
        } 
        else {
          alert('.xlsx, .xls, .csv 확장자를 가진 파일만 업로드가 허용합니다!');
        }
      }
      else return(alert('파일이 등록되지 않았습니다.'));
    };
    
    const changeHandler = (event) => {
      const files = event.target.files;
      handleFiles(files);
    };
    
    const dropHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer.files;
      handleFiles(files);
    };
    
    const dragStartHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setActive(true);
    };
    const dragEndHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setActive(false);
    }
    
    const iconClickHandler = (event) => {
      fileInput.click();
      event.preventDefault();
    }

    uploadBox.addEventListener("drop", dropHandler);
    uploadBox.addEventListener("dragover", dragStartHandler);
    uploadBox.addEventListener("dragleave", dragEndHandler);
    fileInput.addEventListener("change", changeHandler);
    fileIcon.addEventListener("click", iconClickHandler);
    
    return () => {
      uploadBox.removeEventListener("drop", dropHandler);
      uploadBox.removeEventListener("dragover", dragStartHandler);
      uploadBox.removeEventListener("dragleave", dragEndHandler);
      fileInput.removeEventListener("change", changeHandler);
      fileIcon.removeEventListener("click", iconClickHandler);
    };
  }, []);

  return (
    <div className="upload-container">
      <label className={!isActive ? 'contents' : 'contents active'}  htmlFor="input" ref={uploadBoxRef} >
        <div className='upload-icon-container'>
          <img src="/icons/ic_fileImg.svg" alt="파일 아이콘 이미지" ref={fileIconRef}/>
          <span>{' '}파일 선택</span>
        </div>
        <p>{selectedFile ? `선택된 파일: ${selectedFile.name}` : '액셀 파일을 업로드하세요'}</p>
        <div className="upload-btns-container">
          <button className={((selectedFile) ? 'active' : 'inactive')} onClick={clearData}>취소</button>
          <button className={((selectedFile) ? 'active' : 'inactive')} onClick={transmitDrugsData}>업로드</button>
        </div>
      </label>
      <input 
      type="file" 
      id="input" 
      ref={fileInputRef} 
      accept=".csv, .xlsx, .xls" 
      style={{ display: "none" }}/>
    </div>

  );
};

export default FileUpload;
