import Image from 'next/image';
import React from 'react';

const ProfilePicture = ({ imageUrl }) => (
    <>
        {imageUrl && (
            <div className=" w-[8rem] h-[8rem] p-1">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                        crossorigin="anonymous"
                    />
                )}
            </div>
        )}
    </>
);

const PersonalInformation = ({ resumeData, fontSize }) => (
    <div className="flex flex-col justify-center items-start">
        <div className="font-[500]" style={{ fontSize: `${fontSize * 1.4 / 14}rem` }}>{resumeData?.name}</div>
        <div className="text-[#5c5c5c] mb-3" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{resumeData?.personalInfo?.jobTitle}</div>

        <div className="flex w-full gap-2">
            {resumeData?.personalInfo && (
                <>
                    <div className='flex gap-4'>
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                            </svg>
                            <div style={{ fontSize: `${fontSize * 0.9 / 14}rem` }}>{resumeData.personalInfo.emailId}</div>
                        </div>
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                            </svg>
                            <div style={{ fontSize: `${fontSize * 0.9 / 14}rem` }}>{resumeData.personalInfo.phone}</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    </div>
);

const platformIcons = {
    GitHub: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.111.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.419-1.305.763-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.382 1.235-3.221-.123-.303-.535-1.524.118-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.839 1.234 1.911 1.234 3.221 0 4.609-2.803 5.624-5.475 5.921.43.37.824 1.102.824 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
    ),
    Twitter: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M24 4.557a9.828 9.828 0 0 1-2.828.775 4.937 4.937 0 0 0 2.165-2.723c-.944.555-1.987.959-3.102 1.184a4.916 4.916 0 0 0-8.384 4.482C7.728 8.087 4.1 6.13 1.671 3.149a4.822 4.822 0 0 0-.665 2.475 4.913 4.913 0 0 0 2.188 4.093 4.9 4.9 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.951 4.89a4.935 4.935 0 0 1-2.224.084c.623 1.942 2.445 3.355 4.604 3.394A9.867 9.867 0 0 1 0 19.54a13.952 13.952 0 0 0 7.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0 0 24 4.557z" />
        </svg>
    ),
    LinkedIn: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.615c-.966 0-1.5-.634-1.5-1.385 0-.751.543-1.385 1.528-1.385s1.5.634 1.5 1.385c0 .751-.544 1.385-1.528 1.385zm13.5 12.615h-3v-5.5c0-1.381-.495-2.321-1.729-2.321-.943 0-1.505.627-1.754 1.233-.091.224-.114.534-.114.847v5.741h-3v-11h3v1.575c.381-.581 1.073-1.392 2.614-1.392 1.892 0 3.379 1.229 3.379 3.867v6.95z" />
        </svg>
    ),
    // Add other platform icons as needed
};

const Links = ({ resumeData, fontSize }) => (
    <div className='flex flex-col items-start justify-center gap-2'>
        {resumeData.profiles?.map(profile => (
            <a
                key={profile.id}
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className='flex items-center gap-1 text-black'
                style={{ fontSize: `${fontSize * 0.9 / 14}rem` }}
            >
                {platformIcons[profile.platform]}
                {profile.userName}
            </a>
        ))}
    </div>
);

const ProfessionalSummary = ({ summary, fontSize }) => (
    <div className="text-[#414141] mt-2 border-b-2 border-[#cccccc] pb-5 px-2 text-justify" style={{ fontSize: `${fontSize * 0.75 / 14}rem` }}>
        {summary && <div>{summary}</div>}
    </div>
);

const PersonalInfoComponent = ({ resumeData, fontSize }) => (
    <>
        <div className="w-full flex gap-6">
            <ProfilePicture imageUrl={resumeData?.personalInfo?.profilePicture} />
            <div className='flex justify-between w-[80%]'>
                <PersonalInformation resumeData={resumeData} fontSize={fontSize} />
                <Links resumeData={resumeData} fontSize={fontSize} />
            </div>
        </div>
        <ProfessionalSummary summary={resumeData?.personalInfo?.summary} fontSize={fontSize} />
    </>
);

export default PersonalInfoComponent;