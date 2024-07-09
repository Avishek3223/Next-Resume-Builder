import React from 'react';

const ArtisticEndeavors = ({ endeavors }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2" style={{ fontSize: '1rem', color: '#000' }}>Artistic Endeavors</h2>
            {endeavors?.map((endeavor, index) => (
                <div key={index} className="mb-2">
                    <div className="text-[#000000]" style={{ fontSize: '0.9rem' }}>
                        <div className="font-[500]">{endeavor.title}</div>
                        <div className="text-gray-600" style={{ fontSize: '0.8rem' }}>{endeavor.date}</div>
                    </div>
                    <div className="text-[#5c5c5c] mb-3" style={{ fontSize: '0.8rem' }}>{endeavor.description}</div>
                </div>
            ))}
        </div>
    );
};

export default ArtisticEndeavors;