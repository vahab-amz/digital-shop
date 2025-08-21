// src/lib/getBaseUrl.ts
export default function getBaseUrl() {
    console.log('function for url');
    if (typeof window !== 'undefined') {
        // Running in the browser
        return '';
    }

    // If we're in development (localhost)
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3000';
    }

    // If we're in production (e.g., Vercel)
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, '')}`;
    }

    // Fallback just in case
    return 'http://localhost:3000';
}
