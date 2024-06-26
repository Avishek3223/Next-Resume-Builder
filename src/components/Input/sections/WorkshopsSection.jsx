import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const WorkshopsSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index} className="border-b border-[#c2c2c2] pb-4 mb-4">
                    <InputComponent
                        label="Title"
                        value={entry.title}
                        onChange={(e) => onChange('workshops', index, 'title', e.target.value)}
                    />
                    <InputComponent
                        label="Organizer"
                        value={entry.organizer}
                        onChange={(e) => onChange('workshops', index, 'organizer', e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={entry.description}
                        onChange={(e) => onChange('workshops', index, 'description', e.target.value)}
                        className="border border-[#929292] rounded-[6px] p-4"
                        rows="4"
                    />
                    <button
                        onClick={() => onRemove('workshops', index)}
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
                <FaPlus /> Add Another Workshop
            </button>
        </div>
    );
};

export default WorkshopsSection;
