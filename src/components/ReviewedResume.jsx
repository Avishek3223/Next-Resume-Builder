import React from 'react';

const ReviewedResume = ({ reviewContent }) => {
  return (
    <div className="w-[50%] h-full bg-white">
      <h2>Reviewed Resume</h2>
      <p>{reviewContent}</p>
    </div>
  );
};

export default ReviewedResume;
