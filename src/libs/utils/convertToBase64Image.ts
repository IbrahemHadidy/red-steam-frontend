/**
 * Converts icon data to base64 string
 * @param iconData The icon data to convert to base64
 * @returns The base64 string
 */
export default function convertToBase64Image(iconData: Buffer | number[]): string {
  let base64String: string;

  if (iconData instanceof Buffer) {
    base64String = iconData.toString('base64');
  } else if (Array.isArray(iconData)) {
    base64String = Buffer.from(new Uint8Array(iconData)).toString('base64');
  } else {
    console.error('Unsupported data type. Expected Buffer or number[]');
    return '';
  }

  return `data:image/png;base64,${base64String}`;
}
