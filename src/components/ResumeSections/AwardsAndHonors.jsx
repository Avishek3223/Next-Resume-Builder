import React from 'react';

const AwardsAndHonors = ({ awards }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2" style={{ fontSize: '1rem', color: '#000' }}>Awards and Honors</h2>
            {awards?.map((award, index) => (
                <div key={index} className="mb-2">
                    <div className="flex justify-between items-center text-[#000000]" style={{ fontSize: '0.9rem' }}>
                        <div className="flex gap-1">
                            <div className="font-[500]">{award.title}</div>
                            <p className="text-[gray]">{award.organization}</p>
                        </div>
                        <div className="text-gray-600" style={{ fontSize: '0.8rem' }}>{award.dateReceived}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AwardsAndHonors;
