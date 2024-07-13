const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // Needed to avoid cross-origin issues
        image.src = url;
    });

const getCroppedImg = async (imageSrc, pixelCrop) => {
    if (!pixelCrop) {
        throw new Error("Pixel crop data is not available");
    }

    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            if (file) {
                file.name = 'cropped.jpeg';
                resolve(URL.createObjectURL(file));
            } else {
                reject(new Error('Canvas is empty'));
            }
        }, 'image/jpeg');
    });
};

export { createImage, getCroppedImg };
