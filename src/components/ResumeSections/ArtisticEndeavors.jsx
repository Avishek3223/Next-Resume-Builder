import React from 'react';

const ArtisticEndeavors = ({ endeavors }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2 border-b border-b-[#979797]" style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>ARTISTIC ENDEAVORS</h2>
            {endeavors?.map((endeavor, index) => (
                <div key={index} className="mb-2">
                    <div className="text-[#000000]" >
                        <div className="font-[600]"style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{endeavor.title}</div>
                        <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{endeavor.date}</div>
                    </div>
                    <div className="text-[#5c5c5c] mb-3" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{endeavor.description}</div>
                </div>
            ))}
        </div>
    );
};

export default ArtisticEndeavors;