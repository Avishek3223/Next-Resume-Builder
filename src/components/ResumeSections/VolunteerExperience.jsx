import React from 'react';

const VolunteerExperience = ({ volunteerExperiences }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2 border-b border-b-[#979797]"  style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>Volunteer Experience</h2>
            {volunteerExperiences?.map((experience, index) => (
                <div key={index} className="mb-2">
                    <div className="flex justify-between items-center text-[#000000]" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                        <div className="flex gap-1">
                            <div className="font-[600]">{experience.role}</div>
                            <p className="text-[gray]">{experience.organization}</p>
                        </div>
                        <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{experience.dates}</div>
                    </div>
                    <div className="text-[#5c5c5c] mb-3" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{experience.responsibilities}</div>
                </div>
            ))}
        </div>
    );
};

export default VolunteerExperience;
