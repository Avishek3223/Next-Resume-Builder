import React from 'react';
import { SliderPicker } from 'react-color';

const FontSettings = ({ fontSize, setFontSize, fontStyle, setFontStyle, fontColor, setFontColor }) => {
    const handleFontSizeChange = (e) => {
        setFontSize(parseInt(e.target.value, 10));
    };

    const handleFontStyleChange = (e) => {
        setFontStyle(e.target.value);
    };

    const handleFontColorChange = (color) => {
        setFontColor(color.hex);
    };

    return (
        <div className="bg-white h-[93vh] w-[20rem] p-6 shadow-lg">
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
                <label className="block text-lg font-medium mb-2">Font Color:</label>
                <SliderPicker
                    color={fontColor}
                    onChangeComplete={handleFontColorChange}
                />
            </div>
        </div>
    );
};

export default FontSettings;
