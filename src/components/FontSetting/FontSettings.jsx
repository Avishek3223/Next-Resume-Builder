import React from 'react';
import { SliderPicker } from 'react-color';
import '@fontsource/roboto';
import '@fontsource/open-sans';
import '@fontsource/lato';
import '@fontsource/montserrat';
import '@fontsource/oswald';
import '@fontsource/source-sans-pro';
import '@fontsource/raleway';
import '@fontsource/karla';
import '@fontsource/merriweather';
import '@fontsource/noto-sans';
import ResumeOne from '../../utils/ResumeOne.png';
import ResumeTwo from '../../utils/ResumeTwo.png';

const FontSettings = ({ fontSize, setFontSize, fontStyle, setFontStyle, fontColor, setTemplate, setFontColor, fontFamily, setFontFamily }) => {
    const handleFontSizeChange = (e) => {
        setFontSize(parseInt(e.target.value, 10));
    };

    const handleFontStyleChange = (e) => {
        setFontStyle(e.target.value);
    };

    const handleFontColorChange = (color) => {
        setFontColor(color.hex);
    };

    const handleFontFamilyChange = (e) => {
        setFontFamily(e.target.value);
    };

    return (
        <div className="bg-white h-[92vh] w-[30rem] p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Font Settings</h2>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Font Size:</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    min={10}
                    max={24}
                />
            </div>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Font Style:</label>
                <select
                    className="w-full p-2 border rounded-md"
                    value={fontStyle}
                    onChange={handleFontStyleChange}
                >
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                    <option value="bold">Bold</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Font Family:</label>
                <select
                    className="w-full p-2 border rounded-md"
                    value={fontFamily}
                    onChange={handleFontFamilyChange}
                >
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Oswald">Oswald</option>
                    <option value="Source Sans Pro">Source Sans Pro</option>
                    <option value="Raleway">Raleway</option>
                    <option value="Karla">Karla</option>
                    <option value="Merriweather">Merriweather</option>
                    <option value="Noto Sans">Noto Sans</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Color Theme:</label>
                <SliderPicker
                    color={fontColor}
                    onChangeComplete={handleFontColorChange}
                />
            </div>
            <div className='mb-4 font-medium text-[1.2rem] mt-8'>Choose Template:</div>
            <div className='flex gap-6 justify-center'>
                <button onClick={() => setTemplate("Resume")}>
                    <img className='w-[12rem] border' src={ResumeOne.src} alt="Resume Template 1" />
                </button>
                <button onClick={() => setTemplate("Resume2")}>
                    <img className='w-[12rem] border' src={ResumeTwo.src} alt="Resume Template 2" />
                </button>
            </div>
        </div>
    );
};

export default FontSettings;
