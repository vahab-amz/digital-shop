import React from 'react';
import Link from 'next/link';
import { MonitorSmartphone } from 'lucide-react';
import { Button } from './ui';

function Welcome() {
    return (
        <div className="flex flex-col justify-center items-center mt-6 gap-4 text-slate-200">
            <span className="text-4xl">Welcome to</span>
            <div className="flex text-6xl font-semibold">
                <MonitorSmartphone color="white" />
                <h1>Digital Shop</h1>
            </div>
            <Button asChild>
                <Link href="/products">Go to products</Link>
            </Button>
        </div>
    );
}

export default Welcome;
