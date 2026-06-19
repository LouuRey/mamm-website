// lib/rateLimit.js

const rateLimit = new Map(); // Map<ip, timestamp>

export function isRateLimited(ip, duration = 60 * 60 * 1000) {
  const now = Date.now();
  const lastRequestTime = rateLimit.get(ip);

  if (!lastRequestTime || now - lastRequestTime > duration) {
    rateLimit.set(ip, now);
    return false; // tidak kena limit
  }

  return true; // kena rate limit
}
