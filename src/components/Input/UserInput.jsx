import React, { useContext, useState } from 'react';
import { FaPlus, FaMinus, FaUser, FaBriefcase, FaGraduationCap, FaProjectDiagram, FaTasks, FaToolbox, FaCertificate, FaAward, FaHandsHelping, FaBook, FaUsers, FaHeart, FaLink, FaLanguage, FaChalkboardTeacher, FaBookOpen, FaLightbulb, FaRocket } from 'react-icons/fa';
import InputComponent from './InputComponent';
import GithubIcon from '../../utils/GithubIcon.svg';
import { UserDataContext } from '@/context/UserDataContext';
import './UserInput.css';

const UserInput = () => {
    const { userData, updateUserData } = useContext(UserDataContext);
    const [visibleSections, setVisibleSections] = useState({
        basics: false,
        profiles: false,
        workExperience: false,
        education: false,
        academyProjects: false,
        positionsOfResponsibility: false,
        skills: false,
        certifications: false,
        awards: false,
        volunteerExperiences: false,
        publications: false,
        affiliations: false,
        hobbies: false,
        portfolioLinks: false,
        languages: false,
        workshops: false,
        courses: false,
        patents: false,
        endeavors: false,
    });

    const [sectionData, setSectionData] = useState({
        profiles: [{ platform: '', link: '' }],
        workExperience: [{ company: '', position: '', duration: '' }],
        education: [{ institution: '', degree: '', year: '' }],
        academyProjects: [{ title: '', description: '' }],
        positionsOfResponsibility: [{ title: '', description: '' }],
        skills: [{ name: '', level: '' }],
        certifications: [{ name: '', issuer: '' }],
        awards: [{ name: '', issuer: '' }],
        volunteerExperiences: [{ organization: '', role: '' }],
        publications: [{ title: '', journal: '' }],
        affiliations: [{ organization: '', role: '' }],
        hobbies: [{ name: '' }],
        portfolioLinks: [{ platform: '', link: '' }],
        languages: [{ language: '', level: '' }],
        workshops: [{ title: '', organizer: '' }],
        courses: [{ title: '', provider: '' }],
        patents: [{ title: '', description: '' }],
        endeavors: [{ title: '', description: '' }],
    });

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

    const toggleSectionVisibility = (section) => {
        setVisibleSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const handleAddEntry = (section) => {
        setSectionData((prevState) => ({
            ...prevState,
            [section]: [...prevState[section], {}],
        }));
    };

    const handleRemoveEntry = (section, index) => {
        setSectionData((prevState) => ({
            ...prevState,
            [section]: prevState[section].filter((_, i) => i !== index),
        }));
    };

    const handleSectionDataChange = (section, index, field, value) => {
        const newSectionData = [...sectionData[section]];
        newSectionData[index][field] = value;
        setSectionData((prevState) => ({
            ...prevState,
            [section]: newSectionData,
        }));
    };

    const icons = {
        basics: <FaUser />,
        profiles: <GithubIcon />,
        workExperience: <FaBriefcase />,
        education: <FaGraduationCap />,
        academyProjects: <FaProjectDiagram />,
        positionsOfResponsibility: <FaTasks />,
        skills: <FaToolbox />,
        certifications: <FaCertificate />,
        awards: <FaAward />,
        volunteerExperiences: <FaHandsHelping />,
        publications: <FaBook />,
        affiliations: <FaUsers />,
        hobbies: <FaHeart />,
        portfolioLinks: <FaLink />,
        languages: <FaLanguage />,
        workshops: <FaChalkboardTeacher />,
        courses: <FaBookOpen />,
        patents: <FaLightbulb />,
        endeavors: <FaRocket />,
    };

    return (
        <div className='w-[33rem] h-[92vh] border-2 bg-[#ffffff] shadow-lg p-5 overflow-y-scroll max-h-screen scrollbar-hide'>
            <div>
                {Object.keys(visibleSections).map((section) => (
                    <div key={section}>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4">
                                <div className='text-[1.2rem] text-[#000000] opacity-[0.6]'>{icons[section]}</div>
                                <div className='text-[1.2rem] text-[#000000] capitalize'>{section.replace(/([A-Z])/g, ' $1')}</div>
                            </div>
                            <button onClick={() => toggleSectionVisibility(section)}>
                                {visibleSections[section] ? <FaMinus /> : <FaPlus />}
                            </button>
                        </div>
                        {visibleSections[section] && (
                            <div className="flex flex-col gap-4 mt-6">
                                {section === 'basics' ? (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-8 items-center">
                                            <label className="cursor-pointer flex text-black text-[1.2rem] rounded-full font-semibold flex-col justify-center items-center w-[6rem] h-[6rem] bg-[#adadad]" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)' }}>
                                                <FaUser size="2rem" color="white" />
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
                                        <textarea placeholder="Summary" className='h-[12rem] text-[1rem] border border-[#929292] rounded-[6px] outline-none p-4'></textarea>
                                    </div>
                                ) : (
                                    <>
                                        {sectionData[section] && sectionData[section].map((entry, index) => (
                                            <div key={index} className="flex flex-col gap-4 border-b border-[#c2c2c2] pb-4 mb-4">
                                                <InputComponent
                                                    label={`${section.replace(/([A-Z])/g, ' $1')} details`}
                                                    value={entry.details || ''}
                                                    onChange={(e) => handleSectionDataChange(section, index, 'details', e.target.value)}
                                                />
                                                <button
                                                    onClick={() => handleRemoveEntry(section, index)}
                                                    className="self-end text-red-500 hover:text-red-700 transition duration-200"
                                                >
                                                    <FaMinus /> Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => handleAddEntry(section)}
                                            className="self-start text-green-500 hover:text-green-700 transition duration-200"
                                        >
                                            <FaPlus /> Add Another {section.replace(/([A-Z])/g, ' $1')}
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={() => handleUpdate({ name, emailId })}>Done</button>
        </div>
    );
}

export default UserInput;
