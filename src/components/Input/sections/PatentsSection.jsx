import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const PatentsSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index} >
                    <InputComponent
                        label="Title"
                        value={entry.title}
                        onChange={(e) => onChange('patents', index, 'title', e.target.value)}
                    />
                    <InputComponent
                        label="Description"
                        value={entry.description}
                        onChange={(e) => onChange('patents', index, 'description', e.target.value)}
                    />
                    <InputComponent
                        label="Patent Number"
                        value={entry.number}
                        onChange={(e) => onChange('patents', index, 'number', e.target.value)}
                    />
                    <button
                        onClick={() => onRemove('patents', index)}
                        className="w-[20%] mt-6 p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-red-500 hover:text-red-700 transition duration-200 col-span-2"
                    >
                        <FaMinus /> Remove
                    </button>
                </div>
            ))}
            <button
                onClick={() => onAdd('patents')}
                className="w-[20%] ml-auto p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-green-500 hover:text-green-700 transition duration-200 col-span-2"
            >
                <FaPlus /> Add
            </button>
        </div>
    );
};

export default PatentsSection;
