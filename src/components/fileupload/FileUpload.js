import React, { useState, useRef } from 'react';
import '../../styles/FileUpload.css';
import * as XLSX from 'xlsx';

const FileUpload = ({ UploadedFile } ) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);

  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef(null);
  const uploadBoxRef = useRef(null);

  // useEffect(() => {
  //   const uploadBox = uploadBoxRef.current;
  //   const input = inputRef.current;
    
  //   const handleFiles = (files) => {
  //     for (const file of files) {
  //       if (!file.type.startsWith("image/")) continue;
  //       const reader = new FileReader();
  //       reader.onloadend = (e) => {
  //         const result = e.target.result;
  //         if (result) {
  //           setUploadedImages((state) => [...state, result].slice(0, max));
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };
    
  //   const changeHandler = (event) => {
  //     const files = event.target.files;
  //     handleFiles(files);
  //   };
    
  //   const dropHandler = (event) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     const files = event.dataTransfer.files;
  //     handleFiles(files);
  //   };
    
  //   const dragOverHandler = (event) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   };
    
  //   uploadBox.addEventListener("drop", dropHandler);
  //   uploadBox.addEventListener("dragover", dragOverHandler);
  //   input.addEventListener("change", changeHandler);
    
  //   return () => {
  //     uploadBox.removeEventListener("drop", dropHandler);
  //     uploadBox.removeEventListener("dragover", dragOverHandler);
  //     input.removeEventListener("change", changeHandler);
  //   };
  // }, [max]);
  // useEffect(() => {

  // });
  // [파일 아이콘 이미지]를 클릭했을때 useRef에서 호출되는 함수
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // input 태그에서 onChange가 발생했을때 호출되는 함수
  const handleFile = async (file) => {
    try {
        const workbook = await readExcelFile(file);
        const tableData = extractSheetData(workbook);
        setConvertedFile(tableData);
    } catch (error) {
      console.error('엑셀 파일을 읽는 중 에러가 발생했습니다.:', error);
    }
  };

  // [파일 아이콘 이미지]를 클릭햇을대 useRef에서 호출되는 함수? ㄴㄴ 이건 handleFile과 반드시 병합되어야함
  const handleSelect = (event) => {
    const file = (event.target.files.length === 1) ? event.target.files[0] : null;

    if (file) {
      const fileExtension = file.name.split('.').pop();
      const allowedExtensions = ['.xlsx', '.xls'];
      if (allowedExtensions.includes('.' + fileExtension.toLowerCase())) {
        try {
          setSelectedFile(file);
          handleFile(file);
        }
        catch (error) {
          console.log(error);
        }
      } else alert('파일 형식이 .xlsx, .xls 만 허용됩니다.');
    } else return(alert('파일이 등록되지 않았습니다.'));
  };

  const handleDragEnter = (event) => {
    setDragging(true);
    console.log('kkk1');
  }
  const handleDragLeave = (event) => {
    setDragging(false);
    console.log('kkk12');
  }
  const handleDrop = (event) => {
    setDragging(false);
    console.log('kkk123');
    // handleFile(event.target.files[0]);
  }

  const transmitDrugsData = () => {
    if (convertedFile) {UploadedFile(convertedFile);}
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

  return (
    <div className="upload-container">
      <img 
        src="/icons/ic_fileImg.svg"
        alt="파일 아이콘 이미지"
        onClick={handleImageClick}
      />
      <span>파일 선택</span>
      <label className='drag-drop-label' htmlFor=''>
        <input
        ref={fileInputRef}
        name="FileUploadInput"
        type="file"
        id="file-input-container"
        style={{ display: "none" }}
        accept=".xlsx, .xls"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}/>
      </label>

        <label htmlFor='file-input-container'>
          {selectedFile ? `선택된 파일: ${selectedFile.name}` : '액셀 파일을 업로드하세요'}
        </label>

        <button onClick={transmitDrugsData}>업로드</button>
    </div>

  );
};

export default FileUpload;
