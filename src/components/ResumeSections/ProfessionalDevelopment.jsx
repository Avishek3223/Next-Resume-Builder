import React from 'react';

const ProfessionalDevelopment = ({ courses }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2" style={{ fontSize: '1rem', color: '#000' }}>Professional Development</h2>
            {courses?.map((course, index) => (
                <div key={index} className="mb-2">
                    <div className="text-[#000000]" style={{ fontSize: '0.9rem' }}>
                        <div className="font-[500]">{course.title}</div>
                        <div className="text-gray-600" style={{ fontSize: '0.8rem' }}>{course.date}</div>
                    </div>
                    <div className="text-[#5c5c5c] mb-3" style={{ fontSize: '0.8rem' }}>{course.organization}</div>
                </div>
            ))}
        </div>
    );
};

export default ProfessionalDevelopment;
