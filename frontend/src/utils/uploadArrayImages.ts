import { uploadImageToCloudinary } from "./uploadImage";

export const uploadImages = async (imageFiles: File[]): Promise<string[]> => {
  const urls: string[] = [];

  for (const file of imageFiles) {
    const url = await uploadImageToCloudinary(file);
    if (url) {
      urls.push(url);
    } else {
      console.error("Failed to upload image:", file);
    }
  }

  return urls;
};
