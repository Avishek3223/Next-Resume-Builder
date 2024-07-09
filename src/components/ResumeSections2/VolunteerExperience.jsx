import React from 'react';

const VolunteerExperience = ({ volunteerExperiences }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2" style={{ fontSize: '1rem', color: '#000' }}>Volunteer Experience</h2>
            {volunteerExperiences?.map((experience, index) => (
                <div key={index} className="mb-2">
                    <div className="flex justify-between items-center text-[#000000]" style={{ fontSize: '0.9rem' }}>
                        <div className="flex gap-1">
                            <div className="font-[500]">{experience.role}</div>
                            <p className="text-[gray]">{experience.organization}</p>
                        </div>
                        <div className="text-gray-600" style={{ fontSize: '0.8rem' }}>{experience.dates}</div>
                    </div>
                    <div className="text-[#5c5c5c] mb-3" style={{ fontSize: '0.8rem' }}>{experience.responsibilities}</div>
                </div>
            ))}
        </div>
    );
};

export default VolunteerExperience;
