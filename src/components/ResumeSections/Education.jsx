import React from 'react';

const Education = ({ education, fontSize, fontColor }) => {
    return (
        <div className="mt-3">
            <h2 className="font-bold mb-2 border-b border-b-[#979797]" style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>EDUCATION</h2>
            {education?.map((educationItem, index) => (
                <div key={index} className="mb-4">
                    <div className="flex justify-between items-center text-[#000000]">
                        <div className="flex flex-col">
                            <div className="font-[600]" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                                {educationItem.degree}, {educationItem.course}
                            </div>
                            <div className="text-[#000000]" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                                {educationItem.institution}
                            </div>
                            <div className="text-[#000000]" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                                {educationItem.gradeType}: {educationItem.grade}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                                {educationItem.startDate} - {educationItem.present ? "Present" : educationItem.endDate}
                            </div>
                            <div className="text-[#000000]" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                                {educationItem.location}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Education;
