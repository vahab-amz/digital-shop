import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    console.log('✅');
    console.warn('⚠️');
    console.error('❌');

    res.status(200).json({ message: 'Check your Vercel logs!' });
}
