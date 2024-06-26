import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const PublicationsSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index} className="border-b border-[#c2c2c2] pb-4 mb-4">
                    <InputComponent
                        label="Title"
                        value={entry.title}
                        onChange={(e) => onChange('publications', index, 'title', e.target.value)}
                    />
                    <InputComponent
                        label="Publisher"
                        value={entry.publisher}
                        onChange={(e) => onChange('publications', index, 'publisher', e.target.value)}
                    />
                    <textarea
                        placeholder="Summary"
                        value={entry.summary}
                        onChange={(e) => onChange('publications', index, 'summary', e.target.value)}
                        className="border border-[#929292] rounded-[6px] p-4"
                        rows="4"
                    />
                    <button
                        onClick={() => onRemove('publications', index)}
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
                <FaPlus /> Add Another Publication
            </button>
        </div>
    );
};

export default PublicationsSection;
