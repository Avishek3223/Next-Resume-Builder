import React from 'react';

const ReviewedResume = ({ reviewContent }) => {
  return (
    <div className="reviewed-resume">
      <h2>Reviewed Resume</h2>
      <p>{reviewContent}</p>
    </div>
  );
};

export default ReviewedResume;
