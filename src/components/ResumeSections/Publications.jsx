import React from 'react';

const Publications = ({ publications }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2 border-b border-b-[#979797]" style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>PUBLICATIONS</h2>
            {publications?.map((publication, index) => (
                <div key={index} className="mb-2">
                    <div className="text-[#000000]" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                        <div className="font-[600]">{publication.title}</div>
                        <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{publication.date}</div>
                    </div>
                    <div className="text-[#5c5c5c] mb-3" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{publication.description}</div>
                    {publication.url && (
                        <a href={publication.url} target="_blank" rel="noopener noreferrer" className="text-black font-bold" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                            {publication.url}
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Publications;
