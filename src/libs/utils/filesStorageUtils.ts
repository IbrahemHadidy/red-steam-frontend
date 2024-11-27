import { nanoid } from '@reduxjs/toolkit';

const dbName = 'fileStorageDB';
const storeName = 'files';

const openDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

// Save file to IndexedDB
export const saveFileToIndexedDB = async (file: File): Promise<string> => {
  const fileId = nanoid();

  try {
    const db = await openDB();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    const fileData = {
      id: fileId,
      name: file.name,
      type: file.type,
      size: file.size,
      data: file, // Directly store the file (Blob) in IndexedDB
    };

    store.put(fileData);

    return fileId;
  } catch (error) {
    console.error('Error saving file to IndexedDB:', error);
    throw new Error('Failed to save file to IndexedDB');
  }
};

// Retrieve file from IndexedDB
export const getFileFromIndexedDB = async (fileId: string): Promise<File | undefined> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    return new Promise<File | undefined>((resolve, reject) => {
      const request = store.get(fileId);

      request.onsuccess = () => {
        const fileData = request.result;
        if (!fileData) return resolve(undefined);

        resolve(fileData.data); // Return the Blob (File) directly
      };

      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error retrieving file from IndexedDB:', error);
    return undefined;
  }
};
