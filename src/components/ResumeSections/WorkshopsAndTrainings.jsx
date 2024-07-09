import React from 'react';

const WorkshopsAndTrainings = ({ workshops }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2 border-b border-b-[#979797]"  style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>WORKSHOPS AND TRAININGS</h2>
            {workshops?.map((workshop, index) => (
                <div key={index} className="mb-2">
                    <div className="text-[#000000]" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                        <div className="font-[600]">{workshop.title}</div>
                        <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{workshop.date}</div>
                    </div>
                    <div className="text-[#5c5c5c] mb-3"style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{workshop.organization}</div>
                </div>
            ))}
        </div>
    );
};

export default WorkshopsAndTrainings;
