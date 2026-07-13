export const BOOKS_CACHE_KEY = "cachedBooks";
export const USER_CACHE_KEY = "cachedUser";

export const readCache = <T,>(key: string): T | null => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

export const writeCache = (key: string, value: unknown) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
};

export const clearCache = (key: string) => {
  sessionStorage.removeItem(key);
};
