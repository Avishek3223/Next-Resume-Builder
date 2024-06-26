import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const PositionsOfResponsibilitySection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index} className="border-b border-[#c2c2c2] pb-4 mb-4">
                    <InputComponent
                        label="Title"
                        value={entry.title}
                        onChange={(e) => onChange('positionsOfResponsibility', index, 'title', e.target.value)}
                    />
                    <InputComponent
                        label="Description"
                        value={entry.description}
                        onChange={(e) => onChange('positionsOfResponsibility', index, 'description', e.target.value)}
                    />
                    <button
                        onClick={() => onRemove('positionsOfResponsibility', index)}
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
                <FaPlus /> Add Another Position of Responsibility
            </button>
        </div>
    );
};

export default PositionsOfResponsibilitySection;
