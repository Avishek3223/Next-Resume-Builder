import React, { useContext, useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaSave } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from 'axios';
import { UserDataContext } from '@/context/UserDataContext';
import PersonalInfoSection from './sections/PersonalInfoSection';
import ProfilesSection from './sections/ProfilesSection';
import WorkExperienceSection from './sections/WorkExperienceSection';
import EducationSection from './sections/EducationSection';
import PositionsOfResponsibilitySection from './sections/PositionsOfResponsibilitySection';
import SkillsSection from './sections/SkillsSection';
import CertificationsSection from './sections/CertificationsSection';
import AwardsSection from './sections/AwardsSection';
import VolunteerExperiencesSection from './sections/VolunteerExperiencesSection';
import PublicationsSection from './sections/PublicationsSection';
import AffiliationsSection from './sections/AffiliationsSection';
import HobbiesSection from './sections/HobbiesSection';
import LanguagesSection from './sections/LanguagesSection';
import WorkshopsSection from './sections/WorkshopsSection';
import CoursesSection from './sections/CoursesSection';
import PatentsSection from './sections/PatentsSection';
import EndeavorsSection from './sections/EndeavorsSection';
import './UserInput.css';
import { API_BASE_URL } from '@/config';
import ProjectsSection from './sections/ProjectsSection';

const UserInput = () => {
    const { userData, updateUserData, resumeData, resumeDataFetch, sectionData, setSectionData } = useContext(UserDataContext);
    const [loading, setLoading] = useState({});

    const [visibleSections, setVisibleSections] = useState({
        personalInfo: true,
        profiles: false,
        workExperience: false,
        education: false,
        projects: false,
        positionsOfResponsibility: false,
        skills: false,
        certifications: false,
        awards: false,
        volunteerExperiences: false,
        publications: false,
        affiliations: false,
        hobbies: false,
        languages: false,
        workshops: false,
        courses: false,
        patents: false,
        endeavors: false,
    });

    const toggleSectionVisibility = (section) => {
        setVisibleSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const handleAddEntry = (section) => {
        const newEntry = Array.isArray(initialSectionData[section])
            ? { ...initialSectionData[section][0] }
            : { ...initialSectionData[section] };

        setSectionData((prevState) => ({
            ...prevState,
            [section]: Array.isArray(prevState[section])
                ? [...prevState[section], newEntry]
                : { ...newEntry },
        }));
    };

    const handleRemoveEntry = (section, index) => {
        setSectionData((prevState) => ({
            ...prevState,
            [section]: Array.isArray(prevState[section])
                ? prevState[section].filter((_, i) => i !== index)
                : prevState[section],
        }));
    };

    const handleSectionDataChange = (section, index, field, value) => {
        if (section === 'skills') {
            setSectionData((prevState) => ({
                ...prevState,
                [section]: value,
            }));
        } else if (Array.isArray(sectionData[section])) {
            const newSectionData = [...sectionData[section]];
            newSectionData[index][field] = value;
            setSectionData((prevState) => ({
                ...prevState,
                [section]: newSectionData,
            }));
        } else {
            setSectionData((prevState) => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [field]: value,
                },
            }));
        }
    };

    const handleSave = async (section) => {
        setLoading((prev) => ({ ...prev, [section]: true }));
        try {
            console.log(`Saving section: ${section}`);

            const currentUserDataResponse = await axios.get(`${API_BASE_URL}/get-user/${userData.emailId}`);
            const currentUserData = currentUserDataResponse.data;

            let updatedUserData = { ...currentUserData };

            if (section === 'skills') {
                updatedUserData[section] = sectionData[section].split(',').map(skill => skill.trim());
            } else if (Array.isArray(sectionData[section])) {
                updatedUserData[section] = sectionData[section].map((entry) => {
                    const existingEntry = currentUserData[section]?.find(e => e.id === entry.id);
                    return existingEntry ? { ...existingEntry, ...entry } : entry;
                });
            } else {
                updatedUserData[section] = { ...currentUserData[section], ...sectionData[section] };
            }
            const response = await axios.put(`${API_BASE_URL}/update-user/${userData.displayName}/${userData.emailId}`, updatedUserData);

            updateUserData(response.data);
            if (response.data) {
                resumeDataFetch();
            }
        } catch (error) {
            console.error("Error updating user data:", error.response ? error.response.data : error.message);
        }
        setLoading((prev) => ({ ...prev, [section]: false }));
    };

    return (
        <div className='w-[33rem] h-[92vh] border-2 bg-[#ffffff] shadow-lg p-5 overflow-y-scroll max-h-screen scrollbar-hide'>
            <div>
                {Object.keys(visibleSections).map((section) => (
                    <div key={section}>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4">
                                <div className='text-[1.2rem] text-[#000000] capitalize'>{section.replace(/([A-Z])/g, ' $1')}</div>
                            </div>
                            <button onClick={() => toggleSectionVisibility(section)}>
                                {visibleSections[section] ? <FaMinus /> : <FaPlus />}
                            </button>
                        </div>
                        {visibleSections[section] && (
                            <div className="flex flex-col gap-4 mt-6">
                                {section === 'personalInfo' && (
                                    <PersonalInfoSection data={resumeData.personalInfo || sectionData.personalInfo} onChange={(field, value) => handleSectionDataChange('personalInfo', null, field, value)} />
                                )}
                                {section === 'profiles' && (
                                    <ProfilesSection
                                        data={resumeData.profiles || sectionData.profiles}
                                        onAdd={() => handleAddEntry('profiles')}
                                        onRemove={(index) => handleRemoveEntry('profiles', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'workExperience' && (
                                    <WorkExperienceSection
                                        data={resumeData.workExperience || sectionData.workExperience}
                                        onAdd={() => handleAddEntry('workExperience')}
                                        onRemove={(index) => handleRemoveEntry('workExperience', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'education' && (
                                    <EducationSection
                                        data={resumeData.education || sectionData.education}
                                        onAdd={() => handleAddEntry('education')}
                                        onRemove={(index) => handleRemoveEntry('education', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'projects' && (
                                    <ProjectsSection
                                        data={resumeData.projects || sectionData.projects}
                                        onAdd={() => handleAddEntry('projects')}
                                        onRemove={(index) => handleRemoveEntry('projects', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'positionsOfResponsibility' && (
                                    <PositionsOfResponsibilitySection
                                        data={resumeData.positionsOfResponsibility || sectionData.positionsOfResponsibility}
                                        onAdd={() => handleAddEntry('positionsOfResponsibility')}
                                        onRemove={(index) => handleRemoveEntry('positionsOfResponsibility', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'skills' && (
                                    <SkillsSection data={resumeData.skills || sectionData.skills} onChange={(value) => handleSectionDataChange('skills', null, null, value)} />
                                )}
                                {section === 'certifications' && (
                                    <CertificationsSection
                                        data={resumeData.certifications || sectionData.certifications}
                                        onAdd={() => handleAddEntry('certifications')}
                                        onRemove={(index) => handleRemoveEntry('certifications', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'awards' && (
                                    <AwardsSection
                                        data={resumeData.awards || sectionData.awards}
                                        onAdd={() => handleAddEntry('awards')}
                                        onRemove={(index) => handleRemoveEntry('awards', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'volunteerExperiences' && (
                                    <VolunteerExperiencesSection
                                        data={resumeData.volunteerExperiences || sectionData.volunteerExperiences}
                                        onAdd={() => handleAddEntry('volunteerExperiences')}
                                        onRemove={(index) => handleRemoveEntry('volunteerExperiences', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'publications' && (
                                    <PublicationsSection
                                        data={resumeData.publications || sectionData.publications}
                                        onAdd={() => handleAddEntry('publications')}
                                        onRemove={(index) => handleRemoveEntry('publications', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'affiliations' && (
                                    <AffiliationsSection
                                        data={resumeData.affiliations || sectionData.affiliations}
                                        onAdd={() => handleAddEntry('affiliations')}
                                        onRemove={(index) => handleRemoveEntry('affiliations', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'hobbies' && (
                                    <HobbiesSection
                                        data={resumeData.hobbies || sectionData.hobbies}
                                        onAdd={() => handleAddEntry('hobbies')}
                                        onRemove={(index) => handleRemoveEntry('hobbies', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'languages' && (
                                    <LanguagesSection
                                        data={resumeData.languages || sectionData.languages}
                                        onAdd={() => handleAddEntry('languages')}
                                        onRemove={(index) => handleRemoveEntry('languages', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'workshops' && (
                                    <WorkshopsSection
                                        data={resumeData.workshops || sectionData.workshops}
                                        onAdd={() => handleAddEntry('workshops')}
                                        onRemove={(index) => handleRemoveEntry('workshops', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'courses' && (
                                    <CoursesSection
                                        data={resumeData.courses || sectionData.courses}
                                        onAdd={() => handleAddEntry('courses')}
                                        onRemove={(index) => handleRemoveEntry('courses', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'patents' && (
                                    <PatentsSection
                                        data={resumeData.patents || sectionData.patents}
                                        onAdd={() => handleAddEntry('patents')}
                                        onRemove={(index) => handleRemoveEntry('patents', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'endeavors' && (
                                    <EndeavorsSection
                                        data={resumeData.endeavors || sectionData.endeavors}
                                        onAdd={() => handleAddEntry('endeavors')}
                                        onRemove={(index) => handleRemoveEntry('endeavors', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                <div className='w-full flex justify-end'>
                                    <button className="text-black text-[1rem] mt-6 flex items-center justify-center gap-2 shadow-md w-[7rem] p-2" onClick={() => handleSave(section)}>
                                        {loading[section] ? <AiOutlineLoading3Quarters className="animate-spin" /> : <FaSave />} Save
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserInput;
