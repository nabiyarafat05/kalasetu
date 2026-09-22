const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;

const rateLimitMap = new Map();

const getClientKey = (req) => {
  const forwarded = req?.headers?.['x-forwarded-for'];
  const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded || req?.ip || 'unknown';
  return String(ip).trim() || 'unknown';
};

const checkRateLimit = (req) => {
  const key = getClientKey(req);
  const now = Date.now();
  const current = rateLimitMap.get(key) || [];
  const valid = current.filter((timestamp) => now - timestamp < WINDOW_MS);

  if (valid.length >= MAX_REQUESTS) {
    rateLimitMap.set(key, valid);
    return false;
  }

  valid.push(now);
  rateLimitMap.set(key, valid);
  return true;
};

module.exports = {
  checkRateLimit,
  MAX_REQUESTS,
  WINDOW_MS
};
