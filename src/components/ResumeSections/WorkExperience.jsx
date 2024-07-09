import React from 'react';

const WorkExperience = ({ workExperience, fontSize, fontColor }) => (
    <div className="">
        <h2 className="font-bold mb-2 border-b border-b-[#979797]" style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>WORK EXPERIENCE</h2>
        {workExperience?.map((experience, index) => (
            <div key={index} className="mb-2">
                <div className="flex justify-between items-center text-[#000000]" style={{ fontSize: `${fontSize * 0.85 / 14}rem` }}>
                    <div className="font-[600]">{experience.company}</div>
                    <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{experience.startDate} - {experience.endDate}</div>
                </div>
                <div className='flex justify-between'>
                    <div className="text-[#5c5c5c] mb-3" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{experience.jobTitle}</div>
                    <p className="text-[#000000]"style={{ fontSize: `${fontSize * 0.7 / 14}rem` }}>{experience.location}</p>
                </div>
                <div className='text-black text-justify' style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{experience.description}</div>
            </div>
        ))}
    </div>
);

export default WorkExperience;
