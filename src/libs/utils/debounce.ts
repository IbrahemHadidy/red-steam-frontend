/**
 * Debounces a function to prevent it from being called too often
 * @param func The function to debounce
 * @param delay The delay to wait before calling the function in ms
 * @returns The debounced function
 */
export default function debounce<T extends (...args: never[]) => unknown>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  // Default method to debounce the function
  const debouncedFunction = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };

  // Cancel method to clear the timeout when needed
  debouncedFunction.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debouncedFunction;
}
