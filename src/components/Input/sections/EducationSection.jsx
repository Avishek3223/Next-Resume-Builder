import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const EducationSection = ({ data, onAdd, onRemove, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index} className="">
                    <InputComponent
                        width={100}
                        label="Institution"
                        value={entry.institution}
                        onChange={(e) => onChange('education', index, 'institution', e.target.value)}
                    />
                    <InputComponent
                        width={100}
                        label="Degree"
                        value={entry.degree}
                        onChange={(e) => onChange('education', index, 'degree', e.target.value)}
                    />
                    <div className='flex gap-2'>
                        <InputComponent
                            width={100}
                            label="Start Date *"
                            value={entry.startDate}
                            onChange={(e) => onChange('education', index, 'startDate', e.target.value)}
                            type="date"
                        />
                        <div className='w-full'>
                            <InputComponent
                                width={100}
                                label="End Date *"
                                value={entry.endDate}
                                onChange={(e) => onChange('education', index, 'endDate', e.target.value)}
                                type="date"
                            />
                            <div className="col-span-2 flex -mt-[1rem] items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={entry.present}
                                    onChange={(e) => onChange('education', index, 'present', e.target.checked)}
                                />
                                <label>Present</label>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => onRemove('education', index)}
                        className="w-[20%] p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-red-500 hover:text-red-700 transition duration-200 col-span-2"
                    >
                        <FaMinus /> Remove
                    </button>
                </div>
            ))}
            <button
                onClick={() => onAdd('education')}
                className="w-[20%] ml-auto p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-green-500 hover:text-green-700 transition duration-200 col-span-2"
            >
                <FaPlus /> Add
            </button>
        </div>
    );
};

export default EducationSection;
