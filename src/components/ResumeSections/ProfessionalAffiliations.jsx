import React from 'react';

const ProfessionalAffiliations = ({ affiliations }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2 border-b border-b-[#979797]"  style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>PROFESSIONAL AFFILIATION</h2>
            {affiliations?.map((affiliation, index) => (
                <div key={index} className="mb-2">
                    <div className="text-[#000000]"style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                        <div className="font-[600]">{affiliation.organization}</div>
                        <div className="text-gray-600"style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{affiliation.role}</div>
                    </div>
                    <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{affiliation.dates}</div>
                </div>
            ))}
        </div>
    );
};

export default ProfessionalAffiliations;
