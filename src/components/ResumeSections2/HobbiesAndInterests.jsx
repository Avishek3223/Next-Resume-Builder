import React from 'react';

const HobbiesAndInterests = ({ hobbies }) => {
    return (
        <div className="mt-6">
            <h2 className="font-bold mb-2" style={{ fontSize: '1rem', color: '#000' }}>Hobbies and Interests</h2>
            <div className="text-[#000000]" style={{ fontSize: '0.9rem' }}>
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
