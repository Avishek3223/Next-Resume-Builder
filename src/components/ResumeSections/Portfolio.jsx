import React from 'react';

const Portfolio = ({ portfolioLinks }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2 border-b border-b-[#979797]"  style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>PORTFOLIO</h2>
            <div className="text-[#000000]" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                {portfolioLinks?.map((link, index) => (
                    <div key={index} className="mb-2">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-black font-bold" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                            {link}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
