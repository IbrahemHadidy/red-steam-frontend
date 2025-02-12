import type FileMetadata from '@custom-types/file-metadata';
import { getFileFromIndexedDB } from './filesStorageUtils';

function isFileMetadata(obj: FileMetadata | string): obj is FileMetadata {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'id' in obj &&
    'name' in obj &&
    'size' in obj &&
    'type' in obj
  );
}

/**
 * Returns the URL of the file if it is a File object or the string if it is a string
 * @param file The file object or string
 * @returns The URL of the file
 */
export default async function getFileUrl(file: FileMetadata | string): Promise<string> {
  if (isFileMetadata(file)) {
    return URL.createObjectURL((await getFileFromIndexedDB(file.id)) as File);
  } else {
    return file;
  }
}
