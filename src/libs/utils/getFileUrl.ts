import type FileMetadata from '@custom-types/file-metadata';
import { getFileFromLocalStorage } from './filesStorageUtils';

function isFileMetadata(obj: FileMetadata | string): obj is FileMetadata {
  return typeof obj === 'object' && 'id' in obj && 'name' in obj && 'size' in obj && 'type' in obj;
}

/**
 * Returns the URL of the file if it is a File object or the string if it is a string
 * @param file The file object or string
 * @returns The URL of the file
 */
export default function getFileUrl(file: FileMetadata | string): string {
  if (isFileMetadata(file)) {
    return URL.createObjectURL(getFileFromLocalStorage(file.id) as File);
  } else {
    return file;
  }
}
