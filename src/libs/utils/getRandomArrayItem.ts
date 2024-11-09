/**
 * Returns a random item from an array
 * @param arr The array to get a random item from
 * @returns A random item from the array
 */
export default function getRandomArrayItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
