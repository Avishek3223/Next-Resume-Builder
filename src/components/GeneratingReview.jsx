import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import reviewPng from '../utils/review.png'

function GeneratingReview() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 3000),
      setTimeout(() => setStage(2), 6000),
      setTimeout(() => setStage(3), 14000),
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const getStageText = () => {
    switch (stage) {
      case 0: return "Resume Uploaded 👍";
      case 1: return "Analyzing Structure 🤔";
      case 2: return "Generating Review 🔍";
      default: return "🎉 Review Generated 🎉";
    }
  };

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-[70vw] h-[35vw] bg-white flex flex-col justify-center items-center p-5 shadow-lg rounded-lg'>
        <Image width={350} src={reviewPng} className='-mt-20'/>
        <div className='my-5'>
          <p className='text-[1.5rem] font-semibold mb-2'>{getStageText()}</p>
        </div>
        <BarLoader color="#000" width="50%" />
      </div>
    </div>
  );
}

export default GeneratingReview;
