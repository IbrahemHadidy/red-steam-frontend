/**
 * Interface representing metadata for a file,
 * used to define file-related state within the Redux store.
 */
export default interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
}
