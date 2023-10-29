import fs from 'fs';
import path from 'path';

export { base64ToFile };

function formatBase64String (base64Image) {
    // Extract the image format (extension)
    const formatStartIndex = base64Image.indexOf('/') + 1;
    const formatEndIndex = base64Image.indexOf(';');
    const imageFormat = base64Image.substring(formatStartIndex, formatEndIndex);

    // Remove the initial part until 'base64'
    const base64StartIndex = base64Image.indexOf(',') + 1;
    const imageContent = base64Image.substring(base64StartIndex);

    return {
        'extension': imageFormat,
        'Base64String': imageContent
    };
}

function generateFileName(extension) {
    const timestamp = new Date().getTime(); // Get the current timestamp
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    const fileName = `${timestamp}_${randomString}.${extension}`; // Combine timestamp, random string, and extension
    return fileName;
}

function base64ToFile(base64String) {
    var imageInfo = formatBase64String(base64String);
    var filePath = `public/uploads/${generateFileName(imageInfo.extension)}`;
    fs.writeFileSync(filePath, imageInfo.Base64String, 'base64');
    return filePath.replace('public', '');
}
