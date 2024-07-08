import React from 'react';
import InputComponent from '../InputComponent';

const SkillsSection = ({ data, onChange }) => {
    const commaSeparatedString = data;
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        onChange(value); // Pass the string directly
    };

    return (
        <div className="flex flex-col gap-4">
            <InputComponent
                width={100}
                label="Separate each skill by a comma."
                value={commaSeparatedString}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SkillsSection;
