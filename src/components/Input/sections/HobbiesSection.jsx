import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const HobbiesSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index} className="border-b border-[#c2c2c2] pb-4 mb-4">
                    <InputComponent
                        label="Hobby"
                        value={entry.hobby}
                        onChange={(e) => onChange('hobbies', index, 'hobby', e.target.value)}
                    />
                    <button
                        onClick={() => onRemove('hobbies', index)}
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
                <FaPlus /> Add Another Hobby
            </button>
        </div>
    );
};

export default HobbiesSection;
