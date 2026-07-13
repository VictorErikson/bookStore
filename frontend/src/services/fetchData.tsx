const REQUEST_TIMEOUT = 15000;
const RETRY_DELAYS = [2000, 4000, 8000, 10000, 10000, 10000, 10000];

export class HttpError extends Error {
  status: number;
  constructor(status: number) {
    super(`Request failed with status ${status}`);
    this.status = status;
  }
}

const fetchData = async <T,>(url: string, signal?: AbortSignal): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT
  );
  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new HttpError(response.status);
    return (await response.json()) as T;
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", onAbort);
  }
};

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      window.clearTimeout(id);
      signal?.removeEventListener("abort", onAbort);
    };
    const id = window.setTimeout(() => {
      cleanup();
      resolve();
    }, ms);
    const onAbort = () => {
      cleanup();
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort);
  });

const isRetryable = (error: unknown) =>
  !(error instanceof HttpError) ||
  error.status >= 500 ||
  error.status === 408 ||
  error.status === 429;

export const fetchWithRetry = async <T,>(
  url: string,
  signal?: AbortSignal
): Promise<T> => {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fetchData<T>(url, signal);
    } catch (error) {
      if (
        signal?.aborted ||
        attempt >= RETRY_DELAYS.length ||
        !isRetryable(error)
      ) {
        throw error;
      }
      await wait(RETRY_DELAYS[attempt], signal);
    }
  }
};

export default fetchData;
