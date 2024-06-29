import React from 'react';

const UserResume = ({ fileUrl }) => {
  console.log("UserResume component rendering with fileUrl:", fileUrl);

  return (
    <div className="w-full h-screen bg-black">
      <h2 className='text-[4rem] text-white bg-black'>Your Uploaded Resume</h2>
      <iframe src={fileUrl} width="100%" height="500px" title="User Resume"></iframe>
    </div>
  );
};

export default UserResume;
