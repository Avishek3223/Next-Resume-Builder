import React from 'react';

const CertificationsAndLicenses = ({ certifications }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2" style={{ fontSize: '1rem', color: '#000' }}>Certifications and Licenses</h2>
            {certifications?.map((cert, index) => (
                <div key={index} className="mb-2">
                    <div className="flex justify-between items-center text-[#000000]" style={{ fontSize: '0.9rem' }}>
                        <div className="flex gap-1">
                            <div className="font-[500]">{cert.name}</div>
                            <p className="text-[gray]">{cert.organization}</p>
                        </div>
                        <div className="text-gray-600" style={{ fontSize: '0.8rem' }}>{cert.issueDate} - {cert.expirationDate}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CertificationsAndLicenses;