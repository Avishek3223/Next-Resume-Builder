import React from 'react';

const AcademyProjects = ({ academyProjects, fontSize, fontColor }) => (
    <div className="mt-6">
        <h2 className="font-bold mb-2" style={{ fontSize: `${fontSize * 0.89 / 14}rem`, color: fontColor }}>Academy Projects</h2>
        {academyProjects?.map((project, index) => (
            <div key={index} className="mb-2">
                <div className="items-center text-[#000000]" style={{ fontSize: `${fontSize * 1 / 14}rem` }}>
                    <div className="flex justify-between">
                        <div className="font-[500]">{project.title}</div>
                        <div className="text-gray-600" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{project.startDate} - {project.endDate}</div>
                    </div>
                    <div className="mt-2" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                        <ul className="list-disc pl-6">
                            <li>{project.description}</li>
                            <li>
                                Technologies used:{' '}
                                {project.technologies?.map((tech, techIndex) => (
                                    <span key={techIndex}>{tech}, </span>
                                ))}
                            </li>
                            <li>
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-black font-bold">
                                    {project.url}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default AcademyProjects;
