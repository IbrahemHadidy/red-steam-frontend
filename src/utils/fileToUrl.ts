/**
 * Converts a File object to a URL
 * @param file The File object to convert
 * @returns The URL of the file
 */
export default function fileToUrl(file: File): string {
  return URL.createObjectURL(file);
}
