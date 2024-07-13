import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const ProjectsSection = ({ data, onAdd, onRemove, onChange }) => {
  console.log(data);
  return (
    <div className="flex flex-col gap-4">
      {data.map((entry, index) => (
        <div key={index} className="">
          <InputComponent
            label="Project Title"
            value={entry.title}
            onChange={(e) => onChange('projects', index, 'title', e.target.value)}
          />
          <InputComponent
            label="Link"
            value={entry.url}
            onChange={(e) => onChange('projects', index, 'url', e.target.value)}
          />
          <div className='flex gap-2'>
            <InputComponent
              label="Start Date"
              width={90}
              value={entry.startDate}
              onChange={(e) => onChange('projects', index, 'startDate', e.target.value)}
            />
            <InputComponent
              label="End Date"
              width={90}
              value={entry.endDate}
              onChange={(e) => onChange('projects', index, 'endDate', e.target.value)}
            />
          </div>
          <InputComponent
            label="Technologies (comma-separated)"
            onChange={(e) => onChange('projects', index, 'technologies', e.target.value.split(',').map(tech => tech.trim()))}
            value={entry.technologies.join(', ')}
          />
          <textarea
            placeholder="Summary"
            className="h-[8rem] w-full text-[1rem] border border-[#929292] rounded-[6px] outline-none p-4"
            onChange={(e) => onChange('projects', index, 'description', e.target.value)}
            value={entry.description}
          />
          <button
            onClick={() => onRemove(index)}
            className="w-[20%] p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-red-500 hover:text-red-700 transition duration-200 col-span-2"
          >
            <FaMinus /> Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => onAdd('projects')}
        className="w-[20%] ml-auto p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-green-500 hover:text-green-700 transition duration-200 col-span-2"
      >
        <FaPlus /> Add
      </button>
    </div>
  );
};

export default ProjectsSection;
