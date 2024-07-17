import React, { useEffect, useState } from 'react';
import './Loading.css';

const Loading = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 10000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return showLoader ? (
    <>
      <div className="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="body">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="base">
          <span></span>
          <div className="face"></div>
        </div>
      </div>

      <h1 className='source tracking-wide text-[1.1rem]'>Magic in Progress...</h1>
    </>
  ) : null;
};

export default Loading;