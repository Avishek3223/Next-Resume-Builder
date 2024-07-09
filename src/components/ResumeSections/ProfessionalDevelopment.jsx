import React from 'react';

const ProfessionalDevelopment = ({ courses,fontSize, fontColor  }) => {
    return (
        <div className="mt-5">
            <h2 className="font-bold mb-2 border-b border-b-[#979797]" style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>COURSES</h2>
            {courses?.map((data, index) => (
                <div key={index}>
                    <div className="text-[#000000]">
                        <div style={{ fontSize: `${fontSize * 0.8 / 14}rem`}}>{data.course} by { data.institution}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfessionalDevelopment;
