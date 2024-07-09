import React from 'react';

const ProfessionalDevelopment = ({ courses,fontSize, fontColor  }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2" style={{ fontSize: `${fontSize * 0.89 / 14}rem`, color: fontColor }}>Courses</h2>
            {courses?.map((data, index) => (
                <div key={index} className="mb-2">
                    <div className="text-[#000000]" style={{ fontSize: '0.9rem' }}>
                        <div style={{ fontSize: `${fontSize * 0.89 / 14}rem`}}>{data.course} by { data.institution}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfessionalDevelopment;
