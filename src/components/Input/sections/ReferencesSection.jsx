import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const ReferencesSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index} className="border-b border-[#c2c2c2] pb-4 mb-4">
                    <InputComponent
                        label="Name"
                        value={entry.name}
                        onChange={(e) => onChange('references', index, 'name', e.target.value)}
                    />
                    <InputComponent
                        label="Contact Information"
                        value={entry.contact}
                        onChange={(e) => onChange('references', index, 'contact', e.target.value)}
                    />
                    <button
                        onClick={() => onRemove('references', index)}
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
                <FaPlus /> Add Another Reference
            </button>
        </div>
    );
};

export default ReferencesSection;
