import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    console.log('✅ این یک log معمولی است');
    console.warn('⚠️ این یک log با warning است');
    console.error('❌ این یک log با error است');

    res.status(200).json({ message: 'Check your Vercel logs!' });
}
