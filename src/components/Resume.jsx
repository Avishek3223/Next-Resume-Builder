import React, { useContext, useState, useRef } from 'react';
import { UserDataContext } from '@/context/UserDataContext';
import FontSettings from './FontSetting/FontSettings';
import PersonalInfoComponent from './ResumeSections/PersonalInfoComponent';
import WorkExperience from './ResumeSections/WorkExperience';
import Education from './ResumeSections/Education';
import AcademyProjects from './ResumeSections/AcademyProjects';
import PositionsOfResponsibility from './ResumeSections/PositionsOfResponsibility';
import SkillsAndInterests from './ResumeSections/SkillsAndInterests';
import CertificationsAndLicenses from './ResumeSections/CertificationsAndLicenses';
import AwardsAndHonors from './ResumeSections/AwardsAndHonors';
import VolunteerExperience from './ResumeSections/VolunteerExperience';
import Publications from './ResumeSections/Publications';
import ProfessionalAffiliations from './ResumeSections/ProfessionalAffiliations';
import HobbiesAndInterests from './ResumeSections/HobbiesAndInterests';
import Portfolio from './ResumeSections/Portfolio';
import Languages from './ResumeSections/Languages';
import WorkshopsAndTrainings from './ResumeSections/WorkshopsAndTrainings';
import ProfessionalDevelopment from './ResumeSections/ProfessionalDevelopment';
import Patents from './ResumeSections/Patents';
import ArtisticEndeavors from './ResumeSections/ArtisticEndeavors';
import ControlButtons from './ResumeSections/ControlButtons';

const Resume = () => {
    const { userData, resumeData } = useContext(UserDataContext);
    const [scale, setScale] = useState(0.76);
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: -183 });
    const [fontSize, setFontSize] = useState(14); // Default font size in px
    const [fontStyle, setFontStyle] = useState('normal'); // Default font style
    const [fontColor, setFontColor] = useState('#000000'); // Default font color
    const resumeRef = useRef(null);

    const zoomIn = () => {
        setScale((prevScale) => prevScale + 0.1);
    };

    const zoomOut = () => {
        setScale((prevScale) => Math.max(0.1, prevScale - 0.1));
    };

    const handleMouseDown = () => {
        setDragging(true);
        resumeRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            setPosition((prevPosition) => ({
                x: prevPosition.x + e.movementX,
                y: prevPosition.y + e.movementY,
            }));
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
        resumeRef.current.style.cursor = 'grab';
    };

    return (
        <div className="h-[92vh] overflow-x-visible overflow-y-hidden" ref={resumeRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <div
                style={{
                    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                    cursor: 'grab',
                    fontSize: `${fontSize}px`,
                    fontStyle: fontStyle,
                    color: fontColor,
                }}
                className="roboto w-[210mm] h-[297mm] m-auto mt-4 bg-white p-4"
                onMouseDown={handleMouseDown}
            >
                {resumeData && <PersonalInfoComponent resumeData={resumeData} fontSize={fontSize} />}
                {resumeData?.workExperience && <WorkExperience workExperience={resumeData.workExperience} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.education && <Education education={resumeData.education} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.academyProjects && <AcademyProjects academyProjects={resumeData.academyProjects} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.positionsOfResponsibility && <PositionsOfResponsibility positionsOfResponsibility={resumeData.positionsOfResponsibility} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.skills && <SkillsAndInterests skills={resumeData.skills} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.certifications && <CertificationsAndLicenses certifications={resumeData.certifications} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.awards && <AwardsAndHonors awards={resumeData.awards} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.volunteerExperiences && <VolunteerExperience volunteerExperiences={resumeData.volunteerExperiences} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.publications && <Publications publications={resumeData.publications} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.affiliations && <ProfessionalAffiliations affiliations={resumeData.affiliations} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.hobbies && <HobbiesAndInterests hobbies={resumeData.hobbies} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.portfolioLinks && <Portfolio portfolioLinks={resumeData.portfolioLinks} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.languages && <Languages languages={resumeData.languages} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.workshops && <WorkshopsAndTrainings workshops={resumeData.workshops} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.courses && <ProfessionalDevelopment courses={resumeData.courses} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.patents && <Patents patents={resumeData.patents} fontSize={fontSize} fontColor={fontColor} />}
                {resumeData?.endeavors && <ArtisticEndeavors endeavors={resumeData.endeavors} fontSize={fontSize} fontColor={fontColor} />}
            </div>
            <ControlButtons zoomIn={zoomIn} zoomOut={zoomOut} />
            <div className="fixed bottom-0 right-0 z-50">
                <FontSettings
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    fontStyle={fontStyle}
                    setFontStyle={setFontStyle}
                    fontColor={fontColor}
                    setFontColor={setFontColor}
                />
            </div>
        </div>
    );
};

export default Resume;
