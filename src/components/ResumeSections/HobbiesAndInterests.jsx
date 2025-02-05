import React from 'react';

const HobbiesAndInterests = ({ hobbies }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2 border-b border-b-[#979797]"  style={{ fontSize: `${fontSize * 0.95 / 14}rem`, color: fontColor }}>HOBBIES AND INTERESTS</h2>
            <div className="text-[#000000]"style={{ fontSize: `${fontSize * 0.8 / 14}rem` }}>
                {hobbies?.map((hobby, index) => (
                    <div key={index} className="mb-2">
                        {hobby}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HobbiesAndInterests;
