export function getIdFromUrl(url: string) {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
}
