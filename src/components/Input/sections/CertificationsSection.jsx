import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const CertificationsSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index} className="border-b border-[#c2c2c2] pb-4 mb-4">
                    <InputComponent
                        label="Certification"
                        value={entry.certification}
                        onChange={(e) => onChange('certifications', index, 'certification', e.target.value)}
                    />
                    <InputComponent
                        label="Issuing Organization"
                        value={entry.organization}
                        onChange={(e) => onChange('certifications', index, 'organization', e.target.value)}
                    />
                    <button
                        onClick={() => onRemove('certifications', index)}
                        className="self-end text-red-500 hover:text-red-700 transition duration-200"
                    >
                        <FaMinus /> Remove
                    </button>
                </div>
            ))}
            <button
                onClick={onAdd}
                className="self-start text-green-500 hover:text-green-700 transition duration-200"
            >
                <FaPlus /> Add Another Certification
            </button>
        </div>
    );
};

export default CertificationsSection;
