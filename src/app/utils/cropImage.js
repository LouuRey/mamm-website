export const getCroppedImg = (imageSrc, cropPixels, size = 224) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // untuk menghindari CORS issue
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        img,
        cropPixels.x,
        cropPixels.y,
        cropPixels.width,
        cropPixels.height,
        0,
        0,
        size,
        size
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(blob); // return langsung blob (bukan base64!)
      }, 'image/jpeg');
    };

    img.onerror = () => reject(new Error('Failed to load image'));
  });
};
