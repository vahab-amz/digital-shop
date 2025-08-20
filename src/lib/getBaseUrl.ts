// src/lib/getBaseUrl.ts
export default function getBaseUrl() {
    if (typeof window !== 'undefined') {
        // Running in the browser
        return '';
    }

    if (process.env.NEXT_PUBLIC_BASE_URL) {
        // Deployed on Vercel
        return `https://${process.env.NEXT_PUBLIC_BASE_URL}`;
    }

    // Local development
    return 'http://localhost:3000';
}
