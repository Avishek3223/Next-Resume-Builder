import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const CoursesSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index}>
                    <InputComponent
                        label="Course"
                        value={entry.course}
                        onChange={(e) => onChange('courses', index, 'course', e.target.value)}
                    />
                    <InputComponent
                        label="Institution"
                        value={entry.institution}
                        onChange={(e) => onChange('courses', index, 'institution', e.target.value)}
                    />
                    <button
                        onClick={() => onRemove(index)}
                        className="w-[20%] mt-6 p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-red-500 hover:text-red-700 transition duration-200 col-span-2"
                    >
                        <FaMinus /> Remove
                    </button>
                </div>
            ))}
            <button
                onClick={() => onAdd('courses')}
                className="w-[20%] ml-auto p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-green-500 hover:text-green-700 transition duration-200 col-span-2"
            >
                <FaPlus /> Add
            </button>
        </div>
    );
};

export default CoursesSection;
