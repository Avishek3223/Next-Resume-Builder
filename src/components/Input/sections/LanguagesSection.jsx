import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';
import './language.css'

const LanguagesSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Languages</h2>
            {data.map((entry, index) => (
                <div
                    key={index}
                    className=""
                >
                    <InputComponent
                        label="Language"
                        placeholder="Enter language"
                        value={entry.language}
                        onChange={(e) => onChange('languages', index, 'language', e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                        <label className="text-[#585858]">Proficiency</label>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={entry.proficiency}
                            onChange={(e) => onChange('languages', index, 'proficiency', e.target.value)}
                            className="slider-green"
                        />
                        <span>{entry.proficiency}</span>
                    </div>
                    <button
                        onClick={() => onRemove(index)}
                        className="w-[20%] mt-6 p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-red-500 hover:text-red-700 transition duration-200 col-span-2"
                    >
                        <FaMinus /> Remove
                    </button>
                </div>
            ))}
            <button
                onClick={() => onAdd('languages')}
                className="w-[20%] ml-auto p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-green-500 hover:text-green-700 transition duration-200 col-span-2"
            >
                <FaPlus /> Add
            </button>
        </div>
    );
};

export default LanguagesSection;
