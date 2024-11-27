import { toast } from 'react-toastify';

/**
 * Function to extract and render the error message from the toast response data
 * @param data The response data
 * @param fallbackMessage The fallback message to use if the error message is not found
 * @returns The error message
 */
function renderToastErrorMessage(data: unknown, fallbackMessage?: string): string {
  if (
    data &&
    typeof data === 'object' &&
    'data' in data &&
    data.data &&
    typeof data?.data === 'object' &&
    'message' in data.data &&
    typeof data?.data?.message === 'string'
  ) {
    return data?.data?.message ?? fallbackMessage ?? 'An unknown error occurred';
  } else {
    return fallbackMessage ?? 'An unknown error occurred';
  }
}

/**
 * Utility function to handle toast promises
 * @param promise The promise to handle
 * @param options The toast options
 * @returns The promise result or the fallback value
 */
export default async function promiseToast<T>(
  promise: Promise<T>,
  options: {
    pending: string;
    success?: string;
    fallbackError?: string;
    disablePendingDots?: boolean;
  }
): Promise<T | void> {
  return await toast
    .promise(promise, {
      pending: options.pending + (options.disablePendingDots ? '' : '...'),
      success: options.success,
      error: {
        render({ data }) {
          return renderToastErrorMessage(
            data,
            options.fallbackError ??
              `An unknown error occurred while ${options.pending.toLowerCase()}`
          );
        },
      },
    })
    .catch((error) => {
      console.error(`Error while ${options.pending.toLowerCase()}:`, error);
    });
}
