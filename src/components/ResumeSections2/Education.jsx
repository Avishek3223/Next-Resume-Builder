import React from 'react';

const Education = ({ education, fontSize, fontColor }) => (
    <div className="mt-6">
        <h2 className="font-bold mb-2" style={{ fontSize: `${fontSize * 0.89 / 14}rem`, color: fontColor }}>Education</h2>
        {education?.map((educationItem, index) => (
            <div key={index} className="mb-4">
                <div className="flex justify-between items-center text-[#000000]" style={{ fontSize: `${fontSize * 1 / 14}rem` }}>
                    <div className="flex flex-col">
                        <div className="font-[500]">
                            {educationItem.degree}, {educationItem.course}
                        </div>
                        <div className="text-[#000000]" style={{ fontSize: `${fontSize * 0.9 / 14}rem` }}>
                            {educationItem.institution}
                        </div>
                        <div className="text-[#000000]" style={{ fontSize: `${fontSize * 0.9 / 14}rem` }}>
                            {educationItem.gradeType}: {educationItem.grade}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.9 / 14}rem` }}>
                            {educationItem.startDate} - {educationItem.present ? "Present" : educationItem.endDate}
                        </div>
                        <div className="text-[#000000]" style={{ fontSize: `${fontSize * 0.9 / 14}rem` }}>
                            {educationItem.location}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default Education;
