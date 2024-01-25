import React from 'react';
import file_img from './ic_fileImg.svg';
import "./FileUploader.css"

const FileUploader = () => {
  return (
    <div className="uploader-bar-container">
      <div className='uploader-input-container'>
        <img src={file_img} className='fileicon' alt='fileimg'/>
        <input type="file" id="uploader" stype={{display:'none'}}></input>
        <button className='file-upload-save'>저장</button>
      </div>
    </div>
  );
};

export default FileUploader;