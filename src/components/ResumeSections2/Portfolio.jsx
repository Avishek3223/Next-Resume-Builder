import React from 'react';

const Portfolio = ({ portfolioLinks }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2" style={{ fontSize: '1rem', color: '#000' }}>Portfolio</h2>
            <div className="text-[#000000]" style={{ fontSize: '0.9rem' }}>
                {portfolioLinks?.map((link, index) => (
                    <div key={index} className="mb-2">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-black font-bold" style={{ fontSize: '0.8rem' }}>
                            {link}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
