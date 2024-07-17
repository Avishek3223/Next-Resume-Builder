"use client";

import React, { useContext, useEffect, useState } from 'react';
import UserInput from '@/components/Input/UserInput';
import { auth } from '@/components/firebaseApp';
import { useRouter } from 'next/navigation';
import Resume from '@/components/Resume';
import FontSettings from '@/components/FontSetting/FontSettings';
import Resume2 from '@/components/Resume2';
import { UserDataContext } from '@/context/UserDataContext';
import Image from 'next/image';
import Loading from '@/components/Loading'; // Import the Loading component

function Template() {
  const router = useRouter();
  const { logOut } = useContext(UserDataContext);
  const [userData, setUserData] = useState(null);
  const [fontSize, setFontSize] = useState(14);
  const [fontStyle, setFontStyle] = useState('normal');
  const [fontColor, setFontColor] = useState('#0b3f44');
  const [fontFamily, setFontFamily] = useState('Noto Sans');
  const [isCropping, setIsCropping] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [template, setTemplate] = useState("Resume");
  const [showLogout, setShowLogout] = useState(false); // State for showing logout button
  const [loading, setLoading] = useState(true); // State for loading


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Ensure the loading state is false after 2 seconds
    }, 1000);
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
    const user = await auth.currentUser();
    return {
      displayName: user.displayName,
      photoURL: user.photoURL
    };
  };

  const toggleLogout = () => {
    setShowLogout(prevState => !prevState);
  };

  if (loading) {
    return <Loading />; // Show loading animation while data is being fetched
  }

  return (
    <div className='bg-[#eeeeee] h-auto'>
      <div className='flex justify-between p-4 items-center bg-white'>
        <div className='text-[1.2rem] font-[600]' aria-label={`Hi ${userData?.displayName.split(' ')[0]}`}>
          👋Welcome! {userData?.displayName.split(' ')[0]}
        </div>
        <div className='relative'>
          <Image
            className='w-11 h-11 rounded-full cursor-pointer'
            src={userData?.photoURL}
            alt="User Avatar"
            width={44}
            height={44}
            onClick={toggleLogout}
          />
          {showLogout && (
            <div
              className='absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded shadow-lg'
              onClick={logOut}
            >
              <div className='p-2 text-center cursor-pointer'>
                Logout
              </div>
            </div>
          )}
        </div>
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
      </div>
    </div>
  );
}

export default Template;
