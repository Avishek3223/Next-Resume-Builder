import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const VolunteerExperiencesSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index}>
                    <InputComponent
                        label="Organization"
                        value={entry.organization}
                        onChange={(e) => onChange('volunteerExperiences', index, 'organization', e.target.value)}
                    />
                    <InputComponent
                        label="Role"
                        value={entry.role}
                        onChange={(e) => onChange('volunteerExperiences', index, 'role', e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={entry.description}
                        onChange={(e) => onChange('volunteerExperiences', index, 'description', e.target.value)}
                        className="border w-full border-[#929292] rounded-[6px] p-4"
                        rows="4"
                    />
                    <button
                        onClick={() => onRemove('volunteerExperiences', index)}
                        className="w-[20%] p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-red-500 hover:text-red-700 transition duration-200 col-span-2"
                    >
                        <FaMinus /> Remove
                    </button>
                </div>
            ))}
            <button
                onClick={() => onAdd('volunteerExperiences')}
                className="w-[20%] ml-auto p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-green-500 hover:text-green-700 transition duration-200 col-span-2"
            >
                <FaPlus /> Add
            </button>
        </div>
    );
};

export default VolunteerExperiencesSection;
