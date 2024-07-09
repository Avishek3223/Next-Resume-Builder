"use client";

import React, { useEffect, useState } from 'react';
import UserInput from '@/components/Input/UserInput';
import { auth } from '@/components/firebaseApp';
import { useRouter } from 'next/navigation';
import Resume from '@/components/Resume';


function Template() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

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
          setUserData(null);
        }
      } catch (error) {
        console.error('Error retrieving user data from cache:', error);
      }
    };

    getUserDataFromCache();
  }, []);

  return (
    <div className='bg-[#eeeeee] h-auto'>
      {/* <button onClick={logOut}>Logout</button> */}
      {userData && (
        <div className='flex justify-between p-4 items-center bg-white'>
          <div className='text-[1.2rem] font-[600]' aria-label={`Hi ${userData.displayName.slice(0, userData.displayName.indexOf(' '))}`}>
            👋Welcome! {userData.displayName.slice(0, userData.displayName.indexOf(' '))}
          </div>
          <img className='w-11 h-11 rounded-full' src={userData.photoURL} alt="User Avatar" />
        </div>
      )}
      <div className="flex">
        <UserInput />
        <Resume />
        {/* <div className='cursor-pointer' onClick={logOut}>Logout</div> */}
      </div>
    </div>
  );
}

export default Template;
