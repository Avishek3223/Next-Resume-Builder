"use client";

import React, { useContext, useEffect } from 'react';
import './Marketing.css';
import UserResume from './UserResume';
import { UserDataContext } from '@/context/UserDataContext';

function Marketing() {
  const { uploadStatus } = useContext(UserDataContext);

  useEffect(() => {
    console.log(`running marketing.jsx when uploaded is ${uploadStatus.uploaded}`);
  }, [uploadStatus.uploaded]);

  if (uploadStatus.uploaded) {
    console.log('Rendering UserResume component');
    return (
      <div className='w-[50%] h-[100%] max1078:w-[90vw]'>
        <UserResume fileUrl={uploadStatus.fileUrl} />
      </div>
    );
  } else {
    return (
      <div className='w-[60%] max1078:w-[90vw]'>
        <section className='py-12 mt-[10rem] max1078:mt-0 fade-in-up'>
          <div className="container mx-auto px-4">
            <h2 className="text-[4.5vw] font-semibold text-gray-800 mb-4 rainbow-text-animation max767:text-[10vw] max767:text-center">Build Your Perfect Resume</h2>
            <p className="text-[1.5vw] text-[#c7c7c7] text-justify leading-relaxed max600:text-[5vw] max600:text-center source">
            Craft an Impressive Resume that Captures Employers' Attention. Our easy-to-use builder guides you through the process, ensuring you highlight your skills and experience effectively. Upload your resume for free review.
            </p>
          </div>
        </section>
      </div>
    );
  }
}

export default Marketing;