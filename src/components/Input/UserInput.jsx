import React, { useContext } from 'react';
import InputComponent from './InputComponent';
import GithubIcon from '../../utils/GithubIcon.svg';
import { UserDataContext } from '@/context/UserDataContext';
// import Section from '../AllSections/Section';

const UserInput = () => {
    const { userData, updateUserData } = useContext(UserDataContext);

    let name = '';
    let emailId = '';

    if (userData) {
        name = userData.displayName;
        emailId = userData.emailId;
    }

    const handleUpdate = (updatedAttribute) => {
        const updatedUserData = { ...userData, ...updatedAttribute };
        updateUserData(updatedUserData);
    };

    return (
        <div className='w-[33rem] border-2 bg-[#ffffff] shadow-lg p-5 overflow-y-scroll max-h-screen scrollbar-hide'>
            <div>
                <div className="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                    <div className='text-[1.5rem] text-[#000000]'>Basics</div>
                </div>
                <div>
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex gap-8 items-center">
                            <label className="cursor-pointer flex text-black text-[1.2rem] rounded-full font-semibold flex-col justify-center items-center ml-8 w-[6rem] h-[6rem] bg-[#adadad]" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-[4rem] h-[3rem]">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                </svg>
                                <input type="file" className="hidden" />
                            </label>

                            <InputComponent label="Full Name *" />
                        </div>
                        <InputComponent width={100} label="Email *" />
                        <div className="flex w-[100%] gap-2">
                            <InputComponent width={100} className='w-full' label="Phone Number *" />
                            <InputComponent label="Profession *" />
                        </div>
                        <div className='border-b border-[#c2c2c2]'></div>
                        <textarea placeholder="Summary" className='h-[15rem] border border-[#929292] rounded-[6px] outline-none p-4'></textarea>
                    </div>
                </div>
                <div className='border-b border-[#c2c2c2] mt-4'></div>
                <div className="flex mt-4 gap-4">
                    <div className='opacity-[0.6]'>
                        <GithubIcon />
                    </div>
                    <div className='text-[1.5rem] text-[#000000]'>Profiles</div>
                </div>
                {/* <Section /> */}
            </div>
            <button onClick={() => handleUpdate({ name, emailId })}>Done</button>
        </div>
    );
}

export default UserInput;
