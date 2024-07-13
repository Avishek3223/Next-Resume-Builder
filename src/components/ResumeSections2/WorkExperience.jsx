import React from 'react';

const WorkExperience = ({ workExperience, fontSize, fontColor }) => (
    <div>
        <h2 className="font-bold mb-2" style={{ fontSize: `${fontSize * 0.89 / 14}rem`, color: fontColor }}>Work Experience</h2>
        {workExperience?.map((experience, index) => (
            <div key={index} className="mb-2">
                <div className="flex justify-between items-center text-[#000000]" style={{ fontSize: `${fontSize * 1 / 14}rem` }}>
                    <div className="flex gap-1">
                        <div className="font-[500]">{experience.company}</div>
                        <p className="text-[gray]">{experience.location}</p>
                    </div>
                    <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{experience.startDate} - {experience.endDate}</div>
                </div>
                <div className="text-[#5c5c5c] mb-3" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{experience.jobTitle}</div>
            <div className='text-black text-justify' style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{experience.description}</div>
            </div>
        ))}
    </div>
);

export default WorkExperience;
