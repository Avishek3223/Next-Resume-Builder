import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const WorkExperienceSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {data.map((entry, index) => (
                <React.Fragment key={index}>
                    <InputComponent
                        width={100}
                        label="Company Name *"
                        value={entry.company}
                        onChange={(e) => onChange('workExperience', index, 'company', e.target.value)}
                        className="col-span-2"
                    />
                    <InputComponent
                        width={100}
                        label="Job Title *"
                        value={entry.position}
                        onChange={(e) => onChange('workExperience', index, 'position', e.target.value)}
                    />
                    <InputComponent
                        width={100}
                        label="Location *"
                        value={entry.region}
                        onChange={(e) => onChange('workExperience', index, 'region', e.target.value)}
                    />
                    <InputComponent
                        width={100}
                        label="Start Date *"
                        value={entry.startDate}
                        onChange={(e) => onChange('workExperience', index, 'startDate', e.target.value)}
                        type="date"
                    />
                    <InputComponent
                        label="End Date *"
                        value={entry.endDate}
                        onChange={(e) => onChange('workExperience', index, 'endDate', e.target.value)}
                        type="date"
                    />
                    <div className="col-span-2 flex -mt-[2rem] items-center gap-2">
                        <input
                            type="checkbox"
                            checked={entry.present}
                            onChange={(e) => onChange('workExperience', index, 'present', e.target.checked)}
                        />
                        <label>Present</label>
                    </div>
                    <textarea
                        placeholder="Description *"
                        value={entry.description}
                        onChange={(e) => onChange('workExperience', index, 'description', e.target.value)}
                        className="col-span-2 border border-[#929292] rounded-[6px] p-4"
                        rows="4"
                    />
                    <button
                        onClick={() => onRemove(index)}
                        className="w-[20%] p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-red-500 hover:text-red-700 transition duration-200 col-span-2"
                    >
                        <FaMinus /> Remove
                    </button>
                </React.Fragment>
            ))}
            <button
                onClick={() => onAdd('workExperience')}
                className="w-[20%] ml-auto p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-green-500 hover:text-green-700 transition duration-200 col-span-2"
            >
                <FaPlus /> Add
            </button>
        </div>
    );
};

export default WorkExperienceSection;
