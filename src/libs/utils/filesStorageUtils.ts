import { nanoid } from '@reduxjs/toolkit';

export const saveFileToLocalStorage = async (file: File): Promise<string> => {
  const fileId = nanoid();

  // Convert the file to a Base64 string
  const fileBase64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  // Store both metadata and Base64 data in localStorage
  localStorage.setItem(
    fileId,
    JSON.stringify({
      name: file.name,
      type: file.type,
      size: file.size,
      data: fileBase64,
    })
  );

  return fileId;
};

export const getFileFromLocalStorage = (fileId: string): File | undefined => {
  const fileData = localStorage.getItem(fileId);
  if (!fileData) return undefined;

  const { name, type, data } = JSON.parse(fileData);

  // Convert Base64 data back to a binary Blob and then to a File object
  const byteString = atob(data.split(',')[1]);
  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([byteArray], { type });
  return new File([blob], name, { type, lastModified: Date.now() });
};
