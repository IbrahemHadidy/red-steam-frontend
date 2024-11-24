/**
 * Converts a File object to a Base64 string
 * @param file The File object to convert
 * @returns The Base64 string
 */
export default function getBase64FromFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => resolve('');
  });
}
