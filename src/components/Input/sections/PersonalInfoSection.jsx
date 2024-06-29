import React from 'react';
import { FaUser } from 'react-icons/fa';
import InputComponent from '../InputComponent';

const PersonalInfoSection = ({ data, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-8 items-center">
                <label className="cursor-pointer flex text-black text-[1.2rem] rounded-full font-semibold flex-col justify-center items-center w-[6rem] h-[6rem] bg-[#adadad]" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)' }}>
                    <FaUser size="2rem" color="white" />
                    <input type="file" className="hidden" />
                </label>
                <InputComponent label="Full Name *" value={data?.name} onChange={(e) => onChange('name', e.target.value)} />
            </div>
            <InputComponent width={100} label="Email *" value={data?.emailId} onChange={(e) => onChange('emailId', e.target.value)} />
            <div className="flex w-[100%] gap-2">
                <InputComponent width={100} className='w-full' label="Phone Number *" value={data?.phone} onChange={(e) => onChange('phone', e.target.value)} />
                <InputComponent label="Profession *" value={data?.jobTitle} onChange={(e) => onChange('jobTitle', e.target.value)} />
            </div>
            <div className='border-b border-[#c2c2c2]'></div>
            <textarea placeholder="Summary" className='h-[12rem] text-[1rem] border border-[#929292] rounded-[6px] outline-none p-4' value={data?.summary} onChange={(e) => onChange('summary', e.target.value)} />
        </div>
    );
};

export default PersonalInfoSection;
