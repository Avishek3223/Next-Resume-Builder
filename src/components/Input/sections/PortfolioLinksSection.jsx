import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const PortfolioLinksSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index} className="border-b border-[#c2c2c2] pb-4 mb-4">
                    <InputComponent
                        label="Title"
                        value={entry.title}
                        onChange={(e) => onChange('portfolioLinks', index, 'title', e.target.value)}
                    />
                    <InputComponent
                        label="Link"
                        value={entry.link}
                        onChange={(e) => onChange('portfolioLinks', index, 'link', e.target.value)}
                    />
                    <button
                        onClick={() => onRemove('portfolioLinks', index)}
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
                <FaPlus /> Add Another Portfolio Link
            </button>
        </div>
    );
};

export default PortfolioLinksSection;
