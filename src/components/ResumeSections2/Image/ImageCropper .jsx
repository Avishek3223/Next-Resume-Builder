import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './cropImage';

const ImageCropper = ({ imageUrl, onCropComplete, onCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onCropConfirm = async () => {
        try {
            const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
            onCropComplete(croppedImage);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center z-[1000]">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative p-4 rounded-lg z-50 max-w-4xl mx-auto">
                <div className="crop-container" style={{ width: '300px', height: '400px' }}>
                    <Cropper
                        image={imageUrl}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 4}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropCompleteHandler}
                    />
                </div>
                <div className="relative flex w-full justify-center z-50 cursor-pointer">
                    <button onClick={onCancel} className="mr-2 bg-gray-500 text-white px-5 w-full">Cancel</button>
                    <button onClick={onCropConfirm} className="bg-white py-2 w-full">Crop</button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
