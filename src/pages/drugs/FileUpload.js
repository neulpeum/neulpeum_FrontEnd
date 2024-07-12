import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import "styles/ForPages/Drugs/FileUpload.css";
import { MyDate } from 'utils/MyDate';

const FileUpload = ({ Uploading} ) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);

  const [isActive, setActive] = useState(false);

  const fileInputRef = useRef();
  const uploadBoxRef = useRef();
  const fileIconRef = useRef();

  const transmitDrugsData = async () => {
    await Uploading(convertedFile);
      setSelectedFile(null);
      setConvertedFile(null);
  }

  const CancelUploading = () => {
    setSelectedFile(null);
    setConvertedFile(null);
    alert("업로드가 취소되었습니다.");
  }

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
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

    const headers = ['약 이름', '유통기한', '현재 수량', '사용량'];
    const headerIndex = sheetData.findIndex(row => 
      JSON.stringify(Object.values(row).slice(0, headers.length)) === JSON.stringify(headers)
    );
    if (headerIndex === -1) throw new Error('파일 내에 올바른 헤더가 존재하지 않습니다.');

    const tableData = sheetData.slice(headerIndex + 2).filter(row => {
      const rowValues = Object.values(row);
      const isEmptyRow = rowValues.every(cell => cell === undefined || cell === '');

      if (isEmptyRow || row.length === 0) return false;
      if (row.length < 3) {
        throw new Error('파일에 비어있는 칸이 존재합니다. 파일을 다시 검토해보세요');
      }

      if (typeof row[0] !== 'string') throw new Error('[약 이름] 행에 해석할 수 없는 값이 발견되었습니다.');
      if (typeof row[1] !== 'string' && typeof row[1] !== 'number') throw new Error('[유통기한] 행에 해석할 수 없는 값이 발견되었습니다.');
      if (typeof row[2] !== 'number') throw new Error('[현재 수량] 행에 숫자가 아닌 값이 발견되었습니다.');
      if (row.length === 3) row[3] = 0
      else { if (typeof row[3] !== 'number') throw new Error('[사용량] 행에 숫자가 아닌 값이 발견되었습니다.');}

      const expireDate = MyDate.ConvertedExceltoJsonDate(row[1]);

      if (expireDate === null) throw new Error('[유통기한]들 중 존재하지 않는 날짜가 존재합니다. ex) 9999.13.52');
      if (new Date(expireDate) <= new Date()) throw new Error('유통기한이 지났거나 오늘까지인 약이 감지되었습니다.');

      row[0] = row[0].split(" ").join('');
      
      return true;
  });
  
    return tableData;
  };

  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const fileInput = fileInputRef.current;
    const fileIcon = fileIconRef.current;
    
    const handleFiles = async (files) => {
      if (files && files.length > 1) return alert("2개 이상의 파일 업로드는 불가합니다.");

      const file = files[0];
      const fileExtension = file.name.split('.').pop();
      const allowedExtensions = ['.xlsx', '.xls', '.csv'];
      if (!allowedExtensions.includes('.' + fileExtension.toLowerCase())) return alert('.xlsx, .xls, .csv 확장자를 가진 파일만 업로드가 허용합니다!');

      fileInput.value = null;
        try {
          const workbook = await readExcelFile(file);
          const tableData = extractSheetData(workbook);
          setConvertedFile(tableData);
          setSelectedFile(file);
        } catch (error) { 
          alert(error.message);
          CancelUploading();
        }
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
          <button className={((selectedFile) ? 'active' : 'inactive')} onClick={CancelUploading}>취소</button>
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
