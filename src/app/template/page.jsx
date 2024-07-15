"use client";

import React, { useContext, useEffect, useState } from 'react';
import UserInput from '@/components/Input/UserInput';
import { auth } from '@/components/firebaseApp';
import { useRouter } from 'next/navigation';
import Resume from '@/components/Resume';
import FontSettings from '@/components/FontSetting/FontSettings';
import Resume2 from '@/components/Resume2';
import { UserDataContext } from '@/context/UserDataContext';

function Template() {
  const router = useRouter();
  const {resumeData} = useContext(UserDataContext)
  const [userData, setUserData] = useState(null);
  const [fontSize, setFontSize] = useState(14);
  const [fontStyle, setFontStyle] = useState('normal');
  const [fontColor, setFontColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Noto Sans');
  const [isCropping, setIsCropping] = useState(false);
  const image = resumeData?.personalInfo?.profilePicture
  const [croppedImageUrl, setCroppedImageUrl] = useState(image);
  const [template, setTemplate] = useState("Resume");

  const logOut = async () => {
    await auth.signOut();
    router.push('/');
  };

  useEffect(() => {
    const getUserDataFromCache = async () => {
      try {
        const cache = await caches.open('user-data');
        const cachedResponse = await cache.match('user');
        if (cachedResponse) {
          const userData = await cachedResponse.json();
          setUserData(userData);
        } else {
          // Fetch user data from your source (e.g., Firebase) here
          // Assuming a function fetchUserData() that fetches user data
          const fetchedUserData = await fetchUserData();
          setUserData(fetchedUserData);

          // Cache the fetched user data
          const cache = await caches.open('user-data');
          await cache.put('user', new Response(JSON.stringify(fetchedUserData)));
        }
      } catch (error) {
        console.error('Error retrieving user data from cache:', error);
      }
    };

    getUserDataFromCache();
  }, []);

  const fetchUserData = async () => {
    // Implement your logic to fetch user data, for example from Firebase
    // Example: const user = await auth.currentUser();
    // Return the user data
    return {
      displayName: "John Doe",
      photoURL: "https://example.com/user-photo.jpg"
    };
  };

  return (
    <div className='bg-[#eeeeee] h-auto'>
      {/* <button onClick={logOut}>Logout</button> */}
        <div className='flex justify-between p-4 items-center bg-white'>
          <div className='text-[1.2rem] font-[600]' aria-label={`Hi ${userData?.displayName.split(' ')[0]}`}>
            👋Welcome! {userData?.displayName.split(' ')[0]}
          </div>
          <img className='w-11 h-11 rounded-full' src={userData?.photoURL} alt="User Avatar" />
        </div>
      <div className="flex">
        <UserInput />
        {template === 'Resume' ? (
          <Resume
            fontSize={fontSize}
            fontStyle={fontStyle}
            fontColor={fontColor}
            fontFamily={fontFamily}
            setIsCropping={setIsCropping}
            croppedImageUrl={croppedImageUrl}
            setCroppedImageUrl={setCroppedImageUrl}
            isCropping={isCropping}
          />
        ) : (
          <Resume2
            fontSize={fontSize}
            fontStyle={fontStyle}
            fontColor={fontColor}
            fontFamily={fontFamily}
            setIsCropping={setIsCropping}
            croppedImageUrl={croppedImageUrl}
            setCroppedImageUrl={setCroppedImageUrl}
            isCropping={isCropping}
          />
        )}
        <FontSettings
          fontSize={fontSize}
          setFontSize={setFontSize}
          fontStyle={fontStyle}
          setFontStyle={setFontStyle}
          fontColor={fontColor}
          setFontColor={setFontColor}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          setTemplate={setTemplate}
        />
        {/* <div className='cursor-pointer' onClick={logOut}>Logout</div> */}
      </div>
    </div>
  );
}

export default Template;
