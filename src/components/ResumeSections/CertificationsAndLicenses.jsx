import React from 'react';

const CertificationsAndLicenses = ({ certifications }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2 border-b border-b-[#979797]" style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>CERTIFICATIONS</h2>
            {certifications?.map((cert, index) => (
                <div key={index} className="mb-2">
                    <div className="flex justify-between items-center text-[#000000]"style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                        <div className="flex gap-1">
                            <div className="font-[700]">{cert.name}</div>
                            <p className="text-[gray]">{cert.organization}</p>
                        </div>
                        <div className="text-gray-600"style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{cert.issueDate} - {cert.expirationDate}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CertificationsAndLicenses;