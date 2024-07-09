import React from 'react';

const Languages = ({ languages }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2" style={{ fontSize: '1rem', color: '#000' }}>Languages</h2>
            <div className="text-[#000000]" style={{ fontSize: '0.9rem' }}>
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
