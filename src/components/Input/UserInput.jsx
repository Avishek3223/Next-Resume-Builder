import React, { useContext, useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaSave, FaTrash } from 'react-icons/fa';
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
import ProjectsSection from './sections/ProjectsSection';
import './UserInput.css';
import { API_BASE_URL } from '@/config';

const UserInput = () => {
    const { userData, updateUserData, resumeData, resumeDataFetch } = useContext(UserDataContext);
    const [loading, setLoading] = useState(false);

    const [visibleSections, setVisibleSections] = useState({
        personalInfo: true,
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
        languages: false,
        workshops: false,
        courses: false,
        patents: false,
        endeavors: false,
    });

    const initialSectionData = {
        personalInfo: {
            name: '',
            jobTitle: '',
            emailId: '',
            phone: '',
            profilePicture: '',
            summary: ''
        },
        profiles: [{ platform: '', username: "", link: '' }],
        workExperience: [{ company: '', region: '', startDate: '', endDate: '', position: '', description: '', technologies: '' }],
        education: [{ institution: '', course: '', degree: '', year: '' }],
        academyProjects: [{ title: '', description: '', link: '', startDate: '', endDate: '', technologies: [] }],
        positionsOfResponsibility: [{ title: '', description: '' }],
        skills: '',
        certifications: [{ name: '', issuer: '' }],
        awards: [{ name: '', issuer: '' }],
        volunteerExperiences: [{ organization: '', role: '', description: '' }],
        publications: [{ title: '', journal: '', year: '' }],
        affiliations: [{ organization: '', role: '' }],
        hobbies: [{ name: '' }],
        languages: [{ language: '', level: '' }],
        workshops: [{ title: '', organizer: '', year: '' }],
        courses: [{ title: '', provider: '', year: '' }],
        patents: [{ title: '', description: '', year: '' }],
        endeavors: [{ title: '', description: '' }],
    };

    const [sectionData, setSectionData] = useState(initialSectionData);

    useEffect(() => {
        if (resumeData) {
            setSectionData(resumeData);
        }
    }, [resumeData]);

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

    const handleRemoveEntry = (section) => (index) => {
        setSectionData((prevState) => ({
            ...prevState,
            [section]: prevState[section].filter((_, i) => i !== index),
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
        setLoading(true);
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
        } catch (error) {
            console.error("Error updating user data:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
            resumeDataFetch();
        }
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
                                    <PersonalInfoSection data={sectionData.personalInfo} onChange={(field, value) => handleSectionDataChange('personalInfo', null, field, value)} />
                                )}
                                {section === 'profiles' && (
                                    <ProfilesSection
                                        data={sectionData.profiles}
                                        onAdd={() => handleAddEntry('profiles')}
                                        onRemove={handleRemoveEntry('profiles')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'workExperience' && (
                                    <WorkExperienceSection
                                        data={sectionData.workExperience}
                                        onAdd={() => handleAddEntry('workExperience')}
                                        onRemove={handleRemoveEntry('workExperience')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'education' && (
                                    <EducationSection
                                        data={sectionData.education}
                                        onAdd={() => handleAddEntry('education')}
                                        onRemove={handleRemoveEntry('education')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'academyProjects' && (
                                    <ProjectsSection
                                        data={sectionData.academyProjects}
                                        onAdd={() => handleAddEntry('academyProjects')}
                                        onRemove={handleRemoveEntry('academyProjects')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'positionsOfResponsibility' && (
                                    <PositionsOfResponsibilitySection
                                        data={sectionData.positionsOfResponsibility}
                                        onAdd={() => handleAddEntry('positionsOfResponsibility')}
                                        onRemove={handleRemoveEntry('positionsOfResponsibility')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'certifications' && (
                                    <CertificationsSection
                                        data={sectionData.certifications}
                                        onAdd={() => handleAddEntry('certifications')}
                                        onRemove={handleRemoveEntry('certifications')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'awards' && (
                                    <AwardsSection
                                        data={sectionData.awards}
                                        onAdd={() => handleAddEntry('awards')}
                                        onRemove={handleRemoveEntry('awards')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'volunteerExperiences' && (
                                    <VolunteerExperiencesSection
                                        data={sectionData.volunteerExperiences}
                                        onAdd={() => handleAddEntry('volunteerExperiences')}
                                        onRemove={handleRemoveEntry('volunteerExperiences')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'publications' && (
                                    <PublicationsSection
                                        data={sectionData.publications}
                                        onAdd={() => handleAddEntry('publications')}
                                        onRemove={handleRemoveEntry('publications')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'affiliations' && (
                                    <AffiliationsSection
                                        data={sectionData.affiliations}
                                        onAdd={() => handleAddEntry('affiliations')}
                                        onRemove={handleRemoveEntry('affiliations')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'hobbies' && (
                                    <HobbiesSection
                                        data={sectionData.hobbies}
                                        onAdd={() => handleAddEntry('hobbies')}
                                        onRemove={handleRemoveEntry('hobbies')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'languages' && (
                                    <LanguagesSection
                                        data={sectionData.languages}
                                        onAdd={() => handleAddEntry('languages')}
                                        onRemove={handleRemoveEntry('languages')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'workshops' && (
                                    <WorkshopsSection
                                        data={sectionData.workshops}
                                        onAdd={() => handleAddEntry('workshops')}
                                        onRemove={handleRemoveEntry('workshops')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'courses' && (
                                    <CoursesSection
                                        data={sectionData.courses}
                                        onAdd={() => handleAddEntry('courses')}
                                        onRemove={handleRemoveEntry('courses')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'patents' && (
                                    <PatentsSection
                                        data={sectionData.patents}
                                        onAdd={() => handleAddEntry('patents')}
                                        onRemove={handleRemoveEntry('patents')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'endeavors' && (
                                    <EndeavorsSection
                                        data={sectionData.endeavors}
                                        onAdd={() => handleAddEntry('endeavors')}
                                        onRemove={handleRemoveEntry('endeavors')}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'skills' && (
                                    <SkillsSection
                                        data={sectionData.skills}
                                        onChange={(value) => handleSectionDataChange('skills', null, null, value)}
                                    />
                                )}
                                <div className="flex justify-end">
                                    <button
                                        className="bg-white shadow text-[gray] w-[7rem] px-4 py-2 flex justify-center items-center mt-4"
                                        onClick={() => handleSave(section)}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <div className="spinner" />
                                        ) : (
                                            <>
                                                <FaSave className="mr-2" /> Save
                                            </>
                                        )}
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