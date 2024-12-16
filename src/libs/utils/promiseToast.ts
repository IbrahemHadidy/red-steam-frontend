import { toast } from 'react-toastify';

import type { ToastPromiseParams } from 'react-toastify';

/**
 * Extracts and renders the error message from the toast response data.
 * @param data The response data
 * @param fallbackMessage The fallback message if the error message is not found
 * @returns The error message
 */
function extractErrorMessage(data: unknown, fallbackMessage = 'An unknown error occurred'): string {
  if (
    data &&
    typeof data === 'object' &&
    'data' in data &&
    data.data &&
    typeof data?.data === 'object' &&
    'message' in data.data &&
    typeof data?.data?.message === 'string'
  ) {
    return data.data.message;
  }
  return fallbackMessage;
}

/**
 * Handles toast promises with optional configurations for different states.
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
    onlyError?: boolean;
    autoClose?: number;
  }
): Promise<T | void> {
  const fallbackError =
    options.fallbackError ?? `An unknown error occurred while ${options.pending.toLowerCase()}`;

  const errorRenderer = ({ data }: { data: unknown }) => extractErrorMessage(data, fallbackError);

  const toastConfig: ToastPromiseParams<T> = options.onlyError
    ? {
        error: { render: errorRenderer },
      }
    : {
        pending: options.pending + (options.disablePendingDots ? '' : '...'),
        success: options.success,
        error: { render: errorRenderer },
      };

  return await toast
    .promise(promise, toastConfig, { autoClose: options.autoClose })
    .catch((error) => console.error(`Error while ${options.pending.toLowerCase()}:`, error));
}
