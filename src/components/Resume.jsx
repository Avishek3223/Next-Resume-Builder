import React, { useContext, useState, useRef } from 'react';
import { UserDataContext } from '@/context/UserDataContext';

const Resume = () => {
    const { userData, resumeData } = useContext(UserDataContext);
    const [scale, setScale] = useState(0.76);
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: -183 });
    const [fontSize, setFontSize] = useState(14); // Default font size in px
    const resumeRef = useRef(null);

    const zoomIn = () => {
        setScale((prevScale) => prevScale + 0.1);
    };

    const zoomOut = () => {
        setScale((prevScale) => Math.max(0.1, prevScale - 0.1));
    };

    const handleFontSizeChange = (e) => {
        setFontSize(parseInt(e.target.value, 10));
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
                    fontSize: `${fontSize}px`, // Apply dynamic font size
                }}
                className="roboto w-[210mm] h-[297mm] m-auto mt-4 bg-white p-4"
                onMouseDown={handleMouseDown}
            >
                <div className="flex gap-6 ">
                    {/* Profile Picture Section */}
                    <div className="border border-black w-[7rem] h-[7rem]">
                        {/* Display profile picture here */}
                    </div>

                    {/* Personal Information Section */}
                    <div className="flex flex-col justify-start items-start">
                        <div className="font-[500]" style={{ fontSize: `${fontSize * 1.4 / 14}rem` }}>{resumeData?.name}</div>
                        <div className="text-[#5c5c5c] mb-3" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>Fullstack Developer</div>

                        <div className="flex gap-2">
                            {resumeData?.personalInfo && (
                                <>
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                        </svg>
                                        <div style={{ fontSize: `${fontSize * 0.9 / 14}rem` }}>{resumeData.personalInfo.email}</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                        </svg>
                                        <div style={{ fontSize: `${fontSize * 0.9 / 14}rem` }}>{resumeData.personalInfo.phone}</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Professional Summary Section */}
                <div className="text-[#414141] mt-2 border-b-2 border-[#cccccc] pb-5" style={{ fontSize: `${fontSize * 0.75 / 14}rem` }}>
                    {resumeData?.personalInfo?.summary && <div>{resumeData.personalInfo.summary}</div>}
                </div>

                {/* Work Experience Section */}
                <div className="mt-6">
                    <h2 className="font-bold mb-2 text-[#4896d5]" style={{ fontSize: `${fontSize * 0.89 / 14}rem` }}>Work Experience</h2>
                    {resumeData?.workExperience?.map((experience, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex justify-between items-center text-[#000000]" style={{ fontSize: `${fontSize * 1 / 14}rem` }}>
                                <div className="flex gap-1">
                                    <div className="font-[500]">{experience.company}</div>
                                    <p className="text-[gray]">{experience.location}</p>
                                </div>
                                <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                                    {experience.startDate} - {experience.endDate}
                                </div>
                            </div>
                            <div className="text-[#5c5c5c] mb-3" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{experience.jobTitle}</div>
                            <div style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{experience.description}</div>
                        </div>
                    ))}
                </div>

                {/* Education Section */}
                <div className="mt-6">
                    <h2 className="font-bold mb-2 text-[#4896d5]" style={{ fontSize: `${fontSize * 0.89 / 14}rem` }}>Education</h2>
                    {resumeData?.education?.map((educationItem, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex justify-between items-center text-[#000000]" style={{ fontSize: `${fontSize * 1 / 14}rem` }}>
                                <div className="flex gap-1">
                                    <div className="font-[500]">{educationItem.university}</div>
                                    <p className="text-[gray]">{educationItem.location}</p>
                                </div>
                                <div>
                                    <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                                        {educationItem.startDate} - {educationItem.endDate}
                                    </div>
                                    <div style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{educationItem.percentage}</div>
                                </div>
                            </div>
                            <div className="text-[#5c5c5c] mb-3 mt-[-0.5rem]" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{educationItem.degree}</div>
                        </div>
                    ))}
                </div>

                {/* projects */}
                <div className="mt-6">
                    <h2 className="text-[0.89rem] font-bold mb-2 text-[#4896d5]">Academy Projects</h2>
                    {resumeData?.academyProjects?.map((project, index) => (
                        <div key={index} className="mb-2">
                            <div className="items-center text-[1rem] text-[#000000]">
                                <div className="flex justify-between">
                                    <div className="font-[500]">{project.title}</div>
                                    <div className="text-[0.8rem] text-gray-600">
                                        {project.startDate} - {project.endDate}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <ul className="text-[0.8rem] list-disc pl-6">
                                        <li>{project.description}</li>
                                        <li>
                                            Technologies used:{' '}
                                            {project.technologies?.map((tech, techIndex) => (
                                                <span key={techIndex}>{tech}, </span>
                                            ))}
                                        </li>
                                        <li>
                                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-black text-[0.9rem] font-bold">
                                                {project.url}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Positions of Responsibility Section */}
                <div className="mt-6">
                    <h2 className="font-bold mb-2 text-[#4896d5]" style={{ fontSize: `${fontSize * 0.89 / 14}rem` }}>Positions of Responsibility</h2>
                    {resumeData?.positionsOfResponsibility?.map((position, index) => (
                        <div key={index} className="mb-2">
                            <div className="items-center text-[#000000]" style={{ fontSize: `${fontSize * 1 / 14}rem` }}>
                                <div className="flex justify-between">
                                    <div className="font-[500]">{position.title}</div>
                                    <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                                        {position.startDate} - {position.endDate}
                                    </div>
                                </div>
                                <div className="mt-2" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{position.description}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skills & Interests Section */}
                <div className="mt-6">
                    <h2 className="font-bold mb-2 text-[#4896d5]" style={{ fontSize: `${fontSize * 0.89 / 14}rem` }}>Skills & Interests</h2>
                    <div className="mb-2">
                        <ul className="flex gap-2 flex-wrap">
                            {resumeData?.skills?.map((skill, index) => (
                                <li key={index} className="bg-[#ebebeb] w-[6rem] text-center py-1 rounded-[3px] font-[500]" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Control Buttons */}
            <div className="absolute top-6 left-1/2 justify-center flex gap-8">
                <button onClick={zoomIn}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M9 6a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 9 6Z" />
                        <path fillRule="evenodd" d="M2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Zm7-5.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" clipRule="evenodd" />
                    </svg>
                </button>
                <button onClick={zoomOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M6.75 8.25a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z" />
                        <path fillRule="evenodd" d="M9 2a7 7 0 1 0 4.391 12.452l3.329 3.328a.75.75 0 1 0 1.06-1.06l-3.328-3.329A7 7 0 0 0 9 2ZM3.5 9a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z" clipRule="evenodd" />
                    </svg>
                </button>
                <input
                    type="number"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="border border-gray-300 rounded px-2 py-1"
                    min={10}
                    max={24}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
            </div>
        </div>
    );
};

export default Resume;
