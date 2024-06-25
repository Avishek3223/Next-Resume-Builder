"use client";


import React, { useRef } from 'react';
import './Marketing.css';

function UploadForm() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='mt-[25rem] max1078:mt-0'>
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
      <button 
        className='p-3 px-8 bg-white border-b-2 border-r-2 glow-shadow border-black w-[20vw] max1078:w-[80vw]' 
        onClick={handleButtonClick}
      >
        Upload Resume
      </button>
    </div>
  );
}

export default UploadForm;
