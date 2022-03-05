export default function getQueryString(data = {}) {
  return Object.entries(data)
    .map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');
}
