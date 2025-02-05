import React from 'react';

const Languages = ({ languages }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2 border-b border-b-[#979797]"  style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>LANGUAGES</h2>
            <div className="text-[#000000]" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                {languages?.map((language, index) => (
                    <div key={index} className="mb-2">
                        {language.name} - {language.proficiency}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Languages;
