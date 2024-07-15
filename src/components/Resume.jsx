import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserDataContext } from '@/context/UserDataContext';
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
import { toPng, toJpeg } from 'html-to-image';
import ImageCropper from './ResumeSections/Image/ImageCropper ';
import './Marketing.css'

const Resume = ({
    fontSize,
    fontStyle,
    fontColor,
    fontFamily,
    setIsCropping,
    croppedImageUrl,
    setCroppedImageUrl,
    isCropping
}) => {
    const { resumeData } = useContext(UserDataContext);
    const [scale, setScale] = useState(0.76);
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: -183 });
    const resumeRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (resumeData?.personalInfo?.profilePicture) {
            const img = new Image();
            img.src = resumeData.personalInfo.profilePicture;
            img.onload = () => setImageLoaded(true);
        }
    }, [resumeData]);

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

    const handleCropComplete = (croppedImage) => {
        setCroppedImageUrl(croppedImage);
        setIsCropping(false);
    };

    const handleCropCancel = () => {
        setIsCropping(false);
    };

    const downloadImage = (format = 'png') => {
        const resumeContent = resumeRef.current;
        const svgElement = document.getElementById('exclude-from-capture');
        const marginExclude = document.getElementById('resume-content');

        if (svgElement) {
            svgElement.style.display = 'none';
        }
    
        const options = {
            quality: 1.0,
            pixelRatio: 4, // Use a pixel ratio of 1 to avoid scaling
            style: {
                transform: 'scale(1)',
                transformOrigin: 'top left',
                width: '2480px', // Set the width to 210mm in pixels
                height: '3508px',
                margin: 0,
            }
        };
    
        const exportImage = format === 'jpeg' ? toJpeg : toPng;
    
        exportImage(resumeContent, options)
            .then((dataUrl) => {
                if (svgElement) {
                    // Show the SVG element again
                    svgElement.style.display = 'block';
                }
    
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `resume.${format}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                if (svgElement) {
                    // Show the SVG element again in case of an error
                    svgElement.style.display = 'block';
                }
                console.error('Oops, something went wrong!', error);
            });
    };
    


    return (
        <div className="h-[92vh] w-[60vw] overflow-x-visible overflow-y-hidden" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <div
                style={{
                    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                    cursor: 'grab',
                    fontSize: `${fontSize}px`,
                    fontStyle: fontStyle,
                    color: fontColor,
                    fontFamily: fontFamily,
                    pointerEvents: isCropping ? 'none' : 'auto',
                }}
                id='resume-content' className="w-[210mm] h-[297mm] m-auto mt-4 bg-white" ref={resumeRef}
                onMouseDown={handleMouseDown}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" id="exclude-from-capture" className="absolute left-[6.4rem] top-3 w-6 h-5 cursor-pointer z-[100]" onClick={() => setIsCropping(true)}>
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
                {resumeData && (
                    <PersonalInfoComponent
                        resumeData={{
                            ...resumeData,
                            personalInfo: {
                                ...resumeData.personalInfo,
                                profilePicture: croppedImageUrl || resumeData.personalInfo.profilePicture
                            }
                        }}
                        fontSize={fontSize}
                        fontColor={fontColor}
                    />
                )}
                <div className='p-5'>
                    {resumeData?.workExperience?.length > 0 && <WorkExperience workExperience={resumeData.workExperience} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.education?.length > 0 && <Education education={resumeData.education} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.academyProjects?.length > 0 && <AcademyProjects academyProjects={resumeData.academyProjects} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.positionsOfResponsibility?.length > 0 && <PositionsOfResponsibility positionsOfResponsibility={resumeData.positionsOfResponsibility} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.certifications?.length > 0 && <CertificationsAndLicenses certifications={resumeData.certifications} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.awards?.length > 0 && <AwardsAndHonors awards={resumeData.awards} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.volunteerExperiences?.length > 0 && <VolunteerExperience volunteerExperiences={resumeData.volunteerExperiences} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.publications?.length > 0 && <Publications publications={resumeData.publications} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.affiliations?.length > 0 && <ProfessionalAffiliations affiliations={resumeData.affiliations} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.languages?.length > 0 && <Languages languages={resumeData.languages} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.workshops?.length > 0 && <WorkshopsAndTrainings workshops={resumeData.workshops} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.courses?.length > 0 && <ProfessionalDevelopment courses={resumeData.courses} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.patents?.length > 0 && <Patents patents={resumeData.patents} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.endeavors?.length > 0 && <ArtisticEndeavors endeavors={resumeData.endeavors} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.hobbies?.length > 0 && <HobbiesAndInterests hobbies={resumeData.hobbies} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.portfolioLinks?.length > 0 && <Portfolio portfolioLinks={resumeData.portfolioLinks} fontSize={fontSize} fontColor={fontColor} />}
                    {resumeData?.skills?.length > 0 && <SkillsAndInterests skills={resumeData.skills} fontSize={fontSize} fontColor={fontColor} />}
                </div>
            </div>
            <ControlButtons
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                setScale={setScale}
                handleCropComplete={handleCropComplete}
                handleCropCancel={handleCropCancel}
                isCropping={isCropping}
            />
            {isCropping && (
                <ImageCropper
                    imageUrl={resumeData?.personalInfo?.profilePicture}
                    onCropComplete={handleCropComplete}
                    onCropCancel={handleCropCancel}
                />
            )}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 cursor-pointer absolute top-6"
                onClick={() => downloadImage('png')} // You can change 'png' to 'jpeg' if needed
            >
                <path
                    fillRule="evenodd"
                    d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                />
            </svg>

        </div>
    );
};

export default Resume;