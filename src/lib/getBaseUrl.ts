// src/lib/getBaseUrl.ts
export default function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Running in the browser
    return '';
  }

  if (process.env.VERCEL_URL) {
    // Deployed on Vercel
    return `https://${process.env.VERCEL_URL}`;
  }

  // Local development
  return 'http://localhost:3000';
}
