import React, { useState, useEffect, useRef } from 'react';
import '../../styles/FileUpload.css';
import * as XLSX from 'xlsx';

const FileUpload = ({ UploadedFile } ) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);

  const [isActive, setActive] = useState(false);

  const fileInputRef = useRef();
  const uploadBoxRef = useRef();
  const fileIconRef = useRef();

  const transmitDrugsData = () => {
    if (convertedFile) UploadedFile(convertedFile);
    else alert("현재 업로드된 파일이 없습니다. 파일을 선택하고 업로드한 후 시도해주세요.");
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

  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const fileInput = fileInputRef.current;
    const fileIcon = fileIconRef.current;
    
    const handleFiles = async (files) => {
      if (files.length > 1) return alert("2개 이상의 파일 업로드는 불가합니다. 병합한 뒤에 올려주십시오.");

      const file = files[0];
      if (file) {
        const fileExtension = file.name.split('.').pop();
        const allowedExtensions = ['.xlsx', '.xls'];

        if (allowedExtensions.includes('.' + fileExtension.toLowerCase())) {
          try {
            const workbook = await readExcelFile(file);
            const tableData = extractSheetData(workbook);
            setSelectedFile(file);
            setConvertedFile(tableData);
          } catch (error) {
            alert(error);
          }
        } else {
          console.log('액셀 형식 파일만 허용합니다!');
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
      uploadBox.removeEventListener("dragenter", dragStartHandler);
      uploadBox.removeEventListener("dragleave", dragEndHandler);
      fileInput.removeEventListener("change", changeHandler);
      fileIcon.removeEventListener("click", iconClickHandler);
    };
  }, []);

  return (
    <div className="upload-container">
      <label className={!isActive ? 'contents' : 'contents active'}  htmlFor="input" ref={uploadBoxRef} >
        <div>
          <img src="/icons/ic_fileImg.svg" alt="파일 아이콘 이미지" ref={fileIconRef}/>
          <span>{' '}파일 선택</span>
        </div>
        <p>{selectedFile ? `선택된 파일: ${selectedFile.name}` : '액셀 파일을 업로드하세요'}</p>
        <button onClick={transmitDrugsData}>업로드</button>
      </label>
      <input type="file" id="input" ref={fileInputRef} style={{ display: "none" }}/>
    </div>

  );
};

export default FileUpload;
