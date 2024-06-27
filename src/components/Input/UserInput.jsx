import React, { useContext, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { UserDataContext } from '@/context/UserDataContext';
import BasicsSection from './sections/BasicsSection';
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

const UserInput = () => {
    const { userData, updateUserData } = useContext(UserDataContext);
    const [visibleSections, setVisibleSections] = useState({
        basics: true,
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

    const [sectionData, setSectionData] = useState({
        basics: {},
        profiles: [{ platform: '', link: '' }],
        workExperience: [{ company: '', region: '', startDate: '', endDate: '', position: '', description: '', technologies: '' }],
        education: [{ institution: '', degree: '', year: '' }],
        projects: [{ title: '', description: '', link: '' }],
        positionsOfResponsibility: [{ title: '', description: '' }],
        skills: [{ name: '', level: '' }],
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
    });

    const handleUpdate = () => {
        const updatedUserData = { ...userData, ...sectionData };
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
                                {section === 'basics' && (
                                    <BasicsSection data={sectionData.basics} onChange={handleSectionDataChange} />
                                )}
                                {section === 'profiles' && (
                                    <ProfilesSection
                                        data={sectionData.profiles}
                                        onAdd={() => handleAddEntry('profiles')}
                                        onRemove={(index) => handleRemoveEntry('profiles', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'workExperience' && (
                                    <WorkExperienceSection
                                        data={sectionData.workExperience}
                                        onAdd={() => handleAddEntry('workExperience')}
                                        onRemove={(index) => handleRemoveEntry('workExperience', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'education' && (
                                    <EducationSection
                                        data={sectionData.education}
                                        onAdd={() => handleAddEntry('education')}
                                        onRemove={(index) => handleRemoveEntry('education', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'projects' && (
                                    <ProjectsSection
                                        data={sectionData.projects}
                                        onAdd={() => handleAddEntry('projects')}
                                        onRemove={(index) => handleRemoveEntry('projects', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'positionsOfResponsibility' && (
                                    <PositionsOfResponsibilitySection
                                        data={sectionData.positionsOfResponsibility}
                                        onAdd={() => handleAddEntry('positionsOfResponsibility')}
                                        onRemove={(index) => handleRemoveEntry('positionsOfResponsibility', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'skills' && (
                                    <SkillsSection
                                        data={sectionData.skills}
                                        onAdd={() => handleAddEntry('skills')}
                                        onRemove={(index) => handleRemoveEntry('skills', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'certifications' && (
                                    <CertificationsSection
                                        data={sectionData.certifications}
                                        onAdd={() => handleAddEntry('certifications')}
                                        onRemove={(index) => handleRemoveEntry('certifications', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'awards' && (
                                    <AwardsSection
                                        data={sectionData.awards}
                                        onAdd={() => handleAddEntry('awards')}
                                        onRemove={(index) => handleRemoveEntry('awards', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'volunteerExperiences' && (
                                    <VolunteerExperiencesSection
                                        data={sectionData.volunteerExperiences}
                                        onAdd={() => handleAddEntry('volunteerExperiences')}
                                        onRemove={(index) => handleRemoveEntry('volunteerExperiences', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'publications' && (
                                    <PublicationsSection
                                        data={sectionData.publications}
                                        onAdd={() => handleAddEntry('publications')}
                                        onRemove={(index) => handleRemoveEntry('publications', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'affiliations' && (
                                    <AffiliationsSection
                                        data={sectionData.affiliations}
                                        onAdd={() => handleAddEntry('affiliations')}
                                        onRemove={(index) => handleRemoveEntry('affiliations', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'hobbies' && (
                                    <HobbiesSection
                                        data={sectionData.hobbies}
                                        onAdd={() => handleAddEntry('hobbies')}
                                        onRemove={(index) => handleRemoveEntry('hobbies', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'languages' && (
                                    <LanguagesSection
                                        data={sectionData.languages}
                                        onAdd={() => handleAddEntry('languages')}
                                        onRemove={(index) => handleRemoveEntry('languages', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'workshops' && (
                                    <WorkshopsSection
                                        data={sectionData.workshops}
                                        onAdd={() => handleAddEntry('workshops')}
                                        onRemove={(index) => handleRemoveEntry('workshops', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'courses' && (
                                    <CoursesSection
                                        data={sectionData.courses}
                                        onAdd={() => handleAddEntry('courses')}
                                        onRemove={(index) => handleRemoveEntry('courses', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'patents' && (
                                    <PatentsSection
                                        data={sectionData.patents}
                                        onAdd={() => handleAddEntry('patents')}
                                        onRemove={(index) => handleRemoveEntry('patents', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                                {section === 'endeavors' && (
                                    <EndeavorsSection
                                        data={sectionData.endeavors}
                                        onAdd={() => handleAddEntry('endeavors')}
                                        onRemove={(index) => handleRemoveEntry('endeavors', index)}
                                        onChange={handleSectionDataChange}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserInput;
