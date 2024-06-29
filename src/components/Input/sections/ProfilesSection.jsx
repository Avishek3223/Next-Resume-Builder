import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const ProfilesSection = ({ data, onAdd, onRemove, onChange }) => {
    const platforms = ['GitHub', 'LinkedIn', 'Twitter'];

    return (
        <div className="flex flex-col gap-4">
            {data.map((entry, index) => (
                <div key={index} className="">
                    <div className="mb-2 w-[50%] border border-[gray]">
                        <select
                            value={entry.platform}
                            onChange={(e) => onChange('profiles', index, 'platform', e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Select a platform</option>
                            {platforms.map((platform) => (
                                <option key={platform} value={platform}>{platform}</option>
                            ))}
                        </select>
                    </div>
                    <InputComponent
                        label="UserName"
                        value={entry.userName}
                        onChange={(e) => onChange('profiles', index, 'userName', e.target.value)}
                    />
                    <InputComponent
                        width={100}
                        label="Link"
                        value={entry.link}
                        onChange={(e) => onChange('profiles', index, 'link', e.target.value)}
                    />
                    <button
                        onClick={() => onRemove('profiles', index)}
                        className="w-[20%] p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-red-500 hover:text-red-700 transition duration-200 col-span-2"
                    >
                        <FaMinus /> Remove
                    </button>
                </div>
            ))}
            <button
                onClick={() => onAdd('profiles')}
                className="w-[20%] ml-auto p-2 text-center flex justify-center items-center gap-2 bg-[#ffffff] drop-shadow text-green-500 hover:text-green-700 transition duration-200 col-span-2"
            >
                <FaPlus /> Add
            </button>
        </div>
    );
};

export default ProfilesSection;
