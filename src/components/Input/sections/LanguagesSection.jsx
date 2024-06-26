import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const LanguagesSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index} className="border-b border-[#c2c2c2] pb-4 mb-4">
                    <InputComponent
                        label="Language"
                        value={entry.language}
                        onChange={(e) => onChange('languages', index, 'language', e.target.value)}
                    />
                    <InputComponent
                        label="Proficiency"
                        value={entry.proficiency}
                        onChange={(e) => onChange('languages', index, 'proficiency', e.target.value)}
                    />
                    <button
                        onClick={() => onRemove('languages', index)}
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
                <FaPlus /> Add Another Language
            </button>
        </div>
    );
};

export default LanguagesSection;
