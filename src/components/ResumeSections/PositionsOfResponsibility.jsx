import React from 'react';

const PositionsOfResponsibility = ({ positionsOfResponsibility, fontSize, fontColor }) => (
    <div className="mt-6">
        <h2 className="font-bold mb-2 border-b border-b-[#979797]" style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>POSITION OF RESPONSIBILITY</h2>
        {positionsOfResponsibility?.map((position, index) => (
            <div key={index} className="mb-2">
                <div className="items-center text-[#000000]">
                    <div className="flex justify-between">
                        <div className="font-[600]"style={{ fontSize: `${fontSize * 0.85 / 14}rem` }}>{position.title}</div>
                        <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{position.startDate} - {position.endDate}</div>
                    </div>
                    <div className="mt-2" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{position.description}</div>
                </div>
            </div>
        ))}
    </div>
);

export default PositionsOfResponsibility;
