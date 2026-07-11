export const BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:1338";

export const mediaUrl = (url?: string | null) => {
  if (!url) return "";
  return url.startsWith("http") ? url : BASE_URL + url;
};
