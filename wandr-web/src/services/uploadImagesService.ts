// utils/cloudinaryService.ts
import { message } from 'antd';
import { showNotification } from './apiService';

/**
 * Uploads an image to Cloudinary.
 * @param file - The file to upload.
 * @returns A promise that resolves to the URL of the uploaded image or an empty string on failure.
 */

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'wandr-uploads'); // Replace with your Cloudinary preset
  formData.append('cloud_name', 'djmcupdjl'); // Replace with your Cloudinary cloud name

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/djmcupdjl/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.secure_url) {
        showNotification('success', 'Operation Status', 'Image uploaded successfully!');
        return data.secure_url;
    } else {
        showNotification('error', 'Operation Status', 'Error uploading image. Please try again.');
        return '';
    }
  } catch (error) {
    showNotification('error', 'Operation Status', 'Error uploading image. Please try again.');
    return '';
  }
};
