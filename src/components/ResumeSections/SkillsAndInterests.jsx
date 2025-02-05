import React from 'react';

const SkillsAndInterests = ({ skills, fontSize, fontColor }) => (
    <div className="mt-6">
        <h2 className="font-bold mb-4 border-b border-b-[#979797]" style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>SKILLS AND INTEREST</h2>
        <div>
            <ul className="flex gap-2 flex-wrap">
                {skills?.map((skill, index) => (
                    <li key={index} className="bg-[#ebebeb] w-[6rem] text-center py-1 rounded-[3px] font-[500] text-black" style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default SkillsAndInterests;
