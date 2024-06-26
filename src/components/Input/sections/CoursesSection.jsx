import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const CoursesSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index} className="border-b border-[#c2c2c2] pb-4 mb-4">
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
                        onClick={() => onRemove('courses', index)}
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
                <FaPlus /> Add Another Course
            </button>
        </div>
    );
};

export default CoursesSection;
