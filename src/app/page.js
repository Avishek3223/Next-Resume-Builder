import React from 'react';
import Marketing from '@/components/Marketing';
import Navbar from '@/components/Navbar';
import UploadForm from '@/components/UploadForm';
import RootLayout from './layout';

export default function Home() {
  return (
    <RootLayout>
      <div className='flex flex-col w-full h-screen'>
        <Navbar />
        <div className='w-full relative h-[89%] flex justify-around items-start m-auto bg-[#031525] max1078:flex-col max1078:justify-start max1078:items-center'>
              <Marketing />
              <UploadForm />
        </div>
      </div>
    </RootLayout>
  );
}