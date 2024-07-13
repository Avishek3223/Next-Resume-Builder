import { UserDataContext } from '@/context/UserDataContext';
import React, { useContext, useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ReviewedResume = () => {
  const { retrivedResumeReview } = useContext(UserDataContext);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    console.log('retrivedResumeReview:', retrivedResumeReview);
  }, [retrivedResumeReview]);

  if (!retrivedResumeReview) {
    return <div>Loading...</div>;
  }

  const sections = Object.keys(retrivedResumeReview);
  const totalCurrentScore = sections.reduce((sum, section) => sum + retrivedResumeReview[section].currentScore, 0);
  const totalPotentialScore = sections.reduce((sum, section) => sum + retrivedResumeReview[section].potentialScore, 0);
  const averageCurrentScore = totalCurrentScore / sections.length;
  const averagePotentialScore = totalPotentialScore / sections.length;

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-[50%] h-full source bg-white p-4 overflow-scroll px-6 text-justify" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>
        {`
          .overflow-scroll::-webkit-scrollbar {
            display: none;
          }
          .collapsible-section {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease-out;
          }
          .collapsible-section.expanded {
            max-height: 500px; /* Adjust this value based on the content height */
          }
        `}
      </style>
      <h2>Reviewed Resume</h2>
      <div className="mt-8 mb-2 -ml-3 flex justify-between">
        <div className='flex flex-col items-center'>
          <div className='text-[1.2rem] font-[700]'>Current score</div>
          <div className='bebas' style={{ width: 120, height: 120 }}>
            <CircularProgressbar
              value={averageCurrentScore}
              text={`${averageCurrentScore}%`}
              styles={buildStyles({
                textSize: '1.7rem',
                pathColor: `#5dd5ce9e `,
                textColor: '#6aaba7',
                trailColor: '#f3f3f3',
              })}
              strokeWidth={5}
            />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-[1.2rem] font-[700]'>Potential score</div>
          <div className='bebas' style={{ width: 120, height: 120 }}>
            <CircularProgressbar
              value={averagePotentialScore}
              text={`${averagePotentialScore}%`}
              styles={buildStyles({
                textSize: '1.7rem',
                pathColor: `#5dd57b9e`,
                textColor: '#369536',
                trailColor: '#f3f3f3',
              })}
              strokeWidth={5}
            />
          </div>
        </div>
      </div>
      <div className='mt-4 border-y-2 mb-4'>
        {sections.map((section, index) => (
          <div key={index} className="flex items-center justify-between my-4">
            <div className="flex-1">
              <div className="text-sm mb-1"><strong>{section}</strong></div>
              <div className="relative w-full h-2 bg-gray-200 rounded">
                <div className="absolute top-0 left-0 h-full bg-[#ffc400] rounded" style={{ width: `${retrivedResumeReview[section].currentScore}%` }}></div>
              </div>
            </div>
            <div className="ml-4 text-sm">{retrivedResumeReview[section].currentScore}/100</div>
          </div>
        ))}
      </div>
      {averageCurrentScore < 80 ? (
        <div className='flex flex-col source'>
          <span className='font-bold text-[1.4rem]'>Your Resume Needs Work.</span>
          <span className='text-[#6d6d6d] text-[1.1rem]'>Follow the actionables to make it job ready.</span>
        </div>
      ) : (
        <div className='flex flex-col source'>
          <span className='font-bold text-[1.4rem]'>Good Job!</span>
          <span className='text-[#6d6d6d] text-[1.1rem]'>Your Resume is good but needs some work. Follow actionables to make it job ready.</span>
        </div>
      )}
      <div>
        <div className='text-[#636363]'>Resume score above <span className='font-bold'>95</span> significantly increases your chances of getting shortlisted</div>
      </div>
      {sections.map((section, index) => (
        <div key={index} className="mt-6">
          <div className="flex items-center justify-between cursor-pointer border-b-2 p-4" onClick={() => toggleSection(section)}>
            <h3 className="text-lg font-semibold">{section}</h3>
            <button className="ml-4">
              {visibleSections[section] ?
                <svg xmlns="http://www.w3.org/2000/svg" stroke='black' viewBox="0 0 24 24" fill="currentColor" className="w-4">
                  <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke='black' fill="currentColor" className="w-4">
                  <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                </svg>
              }
            </button>
          </div>
          <div className={`collapsible-section ${visibleSections[section] ? 'expanded' : ''}`}>
            <div className="mt-2">
              <ul className="list-disc pl-5">
                {retrivedResumeReview[section].guidance.split(/\d+\.\s+/).filter(point => point).map((point, i) => (
                  <li key={i} className="mt-2">{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewedResume;
