import React from 'react';

const ProfessionalAffiliations = ({ affiliations }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2" style={{ fontSize: '1rem', color: '#000' }}>Professional Affiliations</h2>
            {affiliations?.map((affiliation, index) => (
                <div key={index} className="mb-2">
                    <div className="text-[#000000]" style={{ fontSize: '0.9rem' }}>
                        <div className="font-[500]">{affiliation.organization}</div>
                        <div className="text-gray-600" style={{ fontSize: '0.8rem' }}>{affiliation.role}</div>
                    </div>
                    <div className="text-gray-600" style={{ fontSize: '0.8rem' }}>{affiliation.dates}</div>
                </div>
            ))}
        </div>
    );
};

export default ProfessionalAffiliations;
