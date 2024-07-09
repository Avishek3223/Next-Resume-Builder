import React from 'react';

const Publications = ({ publications }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2" style={{ fontSize: '1rem', color: '#000' }}>Publications</h2>
            {publications?.map((publication, index) => (
                <div key={index} className="mb-2">
                    <div className="text-[#000000]" style={{ fontSize: '0.9rem' }}>
                        <div className="font-[500]">{publication.title}</div>
                        <div className="text-gray-600" style={{ fontSize: '0.8rem' }}>{publication.date}</div>
                    </div>
                    <div className="text-[#5c5c5c] mb-3" style={{ fontSize: '0.8rem' }}>{publication.description}</div>
                    {publication.url && (
                        <a href={publication.url} target="_blank" rel="noopener noreferrer" className="text-black font-bold" style={{ fontSize: '0.8rem' }}>
                            {publication.url}
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Publications;
