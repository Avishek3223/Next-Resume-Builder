"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AuthComponent from './AuthComponent';
import { auth } from './firebaseApp';

function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter(); // Use Next.js router

  const handleBuildResumeClick = () => {
    const user = auth.currentUser;
    console.log(user)
    if (user) {
      router.push('/template');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className='flex justify-between items-center w-full p-6 bg-[#031525] border-b-2 border-black'>
      <div className='text-[2rem] jaro text-white max478:text-[6vw]'>Resume Builder</div>
      <button
        className='text-[1.3rem] font-[500] border bg-[#fff8d7] border-black px-4 py-1 rounded-[6px] max478:text-[5vw]'
        onClick={handleBuildResumeClick}
      >
        Build Resume
      </button>
      <AuthComponent 
        showLoginModal={showLoginModal} 
        handleCloseModal={handleCloseModal} 
        isRegister={isRegister} 
        setIsRegister={setIsRegister} 
      />
    </div>
  );
}

export default Navbar;
