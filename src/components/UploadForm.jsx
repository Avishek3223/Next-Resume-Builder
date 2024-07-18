"use client"

import React, { useContext, useRef } from 'react';
import './Marketing.css';
import { UserDataContext } from '@/context/UserDataContext';
import ReviewedResume from './ReviewedResume';
import GeneratingReview from './GeneratingReview';
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Marketing.css';  // Import your custom styles

function UploadForm({ setUploadStatus }) {
  const fileInputRef = useRef(null);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleButtonClick = () => {
    if (user) {
      fileInputRef.current.click();
    } else {
      toast.info("Please sign up to upload.", {
        className: 'toast-error',
        bodyClassName: 'toast-container',
      });
    }
  };

  const { handleUploadResume, message, uploading, uploadStatus } = useContext(UserDataContext);

  if (uploadStatus.uploaded) {
    return <ReviewedResume />;
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
          </div>
        ) : (
          <button
            className='p-3 px-8 text-[1.2rem] bg-white border-b-2 border-r-2 glow-shadow source font-[700] tracking-wide border-black w-[20vw] max1078:w-[80vw]'
            onClick={handleButtonClick}
            disabled={uploading}
          >
            Upload Resume
          </button>
        )}
        {message && <p>{message}</p>}
        <ToastContainer />
      </div>
    );
  }
}

export default UploadForm;
