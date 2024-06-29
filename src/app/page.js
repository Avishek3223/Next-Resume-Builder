"use client";

import React, { useState, useEffect } from 'react';
import Marketing from '@/components/Marketing';
import Navbar from '@/components/Navbar';
import UploadForm from '@/components/UploadForm';
import UserResume from '@/components/UserResume';
import ReviewedResume from '@/components/ReviewedResume';
import RootLayout from './layout';

export default function Home() {
  const [uploadStatus, setUploadStatus] = useState({ uploaded: false, fileUrl: null });

  console.log(uploadStatus);

  return (
    <RootLayout>
      <div className='flex flex-col w-full h-screen'>
        <Navbar />
        <div className='w-full relative h-full flex justify-around items-start m-auto bg-[#031525] max1078:flex-col max1078:justify-start max1078:items-center'>
          {uploadStatus.uploaded ? (
            <>
              <UserResume fileUrl={uploadStatus.fileUrl} />
              <ReviewedResume reviewContent="This is a placeholder for resume reviews." />

            </>
          ) : (
            <>
              <Marketing uploadStatus={uploadStatus} />
              <UploadForm setUploadStatus={setUploadStatus} />
            </>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
