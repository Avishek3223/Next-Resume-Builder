import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const ProjectsSection = ({ data, onAdd, onRemove, onChange }) => {
  console.log(data)
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
            value={entry.link}
            onChange={(e) => onChange('projects', index, 'link', e.target.value)}
          />
          <textarea placeholder="Summary" className='h-[11rem] w-full text-[1rem] border border-[#929292] rounded-[6px] outline-none p-4'
            onChange={(e) => onChange('projects', index, 'description', e.target.value)}
            value={entry.description}
          />
          <button
            onClick={() => onRemove('projects', index)}
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
