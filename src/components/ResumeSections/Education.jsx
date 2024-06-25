import React from 'react';

const Education = ({ education, fontSize, fontColor }) => (
    <div className="mt-6">
        <h2 className="font-bold mb-2" style={{ fontSize: `${fontSize * 0.89 / 14}rem`, color: fontColor }}>Education</h2>
        {education?.map((educationItem, index) => (
            <div key={index} className="mb-2">
                <div className="flex justify-between items-center text-[#000000]" style={{ fontSize: `${fontSize * 1 / 14}rem` }}>
                    <div className="flex gap-1">
                        <div className="font-[500]">{educationItem.university}</div>
                        <p className="text-[gray]">{educationItem.location}</p>
                    </div>
                    <div>
                        <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                            {educationItem.startDate} - {educationItem.endDate}
                        </div>
                        <div style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{educationItem.percentage}</div>
                    </div>
                </div>
                <div className="text-[#5c5c5c] mb-3 mt-[-0.5rem]" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{educationItem.degree}</div>
            </div>
        ))}
    </div>
);

export default Education;
