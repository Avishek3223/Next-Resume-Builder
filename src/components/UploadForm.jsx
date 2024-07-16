"use client"

import React, { useContext, useRef } from 'react';
import './Marketing.css';
import { UserDataContext } from '@/context/UserDataContext';
import ReviewedResume from './ReviewedResume';
import GeneratingReview from './GeneratingReview';

function UploadForm({ setUploadStatus }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const { handleUploadResume, message, uploading, uploadStatus } = useContext(UserDataContext);

  if (uploadStatus.uploaded) {
    return (
      <ReviewedResume />
    );
  } else {
    return (
      <div className='mt-[25rem] max1078:mt-0'>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={handleUploadResume}
        />

        {uploading ? (
          <div className='w-[99vw] h-[90vh] absolute top-1 left-0' style={{ backdropFilter: 'blur(10px)' }}>
            <GeneratingReview />
          </div>) : (
          <button
            className='p-3 px-8 bg-white border-b-2 border-r-2 glow-shadow border-black w-[20vw] max1078:w-[80vw]'
            onClick={handleButtonClick}
            disabled={uploading}
          >
            Upload Resume
          </button>
        )}
        {message && <p>{message}</p>}
      </div>
    );
  }
}

export default UploadForm;
