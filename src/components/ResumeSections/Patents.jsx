import React from 'react';

const Patents = ({ patents }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2 border-b border-b-[#979797]"  style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>PATENTS</h2>
            {patents?.map((patent, index) => (
                <div key={index} className="mb-2">
                    <div className="" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                        <div className="font-[600]">{patent.title}</div>
                        <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{patent.date}</div>
                    </div>
                    <div className="text-[#5c5c5c] mb-3" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{patent.description}</div>
                </div>
            ))}
        </div>
    );
};

export default Patents;
