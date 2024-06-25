import React from 'react';

const ProfilePicture = ({ imageUrl }) => (
    <div className="border border-black w-[7rem] h-[7rem]">
        
    </div>
);

const PersonalInformation = ({ resumeData, fontSize }) => (
    <div className="flex flex-col justify-start items-start">
        <div className="font-[500]" style={{ fontSize: `${fontSize * 1.4 / 14}rem` }}>{resumeData?.name}</div>
        <div className="text-[#5c5c5c] mb-3" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>{resumeData?.personalInfo?.jobTitle}</div>

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
);

const ProfessionalSummary = ({ summary, fontSize }) => (
    <div className="text-[#414141] mt-2 border-b-2 border-[#cccccc] pb-5" style={{ fontSize: `${fontSize * 0.75 / 14}rem` }}>
        {summary && <div>{summary}</div>}
    </div>
);

const PersonalInfoComponent = ({ resumeData, fontSize }) => (
    <>
        <div className="flex gap-6">
            <ProfilePicture imageUrl={resumeData?.personalInfo?.imageUrl} />
            <div>
                <PersonalInformation resumeData={resumeData} fontSize={fontSize} />
            </div>
        </div>
        <ProfessionalSummary summary={resumeData?.personalInfo?.summary} fontSize={fontSize} />
    </>
);

export default PersonalInfoComponent;
