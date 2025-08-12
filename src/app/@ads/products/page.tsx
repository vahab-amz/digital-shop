import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui';
import Image from 'next/image';

function Ads() {
    return (
        <Card>
            <div className='h-[100px]'>
                <Image 
                    src='/assets/ads.png'
                    alt='Samsung accessories'
                    width={200}
                    height={100}
                    className='rounded-2xl z-20'
                />
            </div>
            <CardContent>
                <CardTitle>Samsung accessories</CardTitle>
                <CardDescription>Advertise</CardDescription>
            </CardContent>
        </Card>
    );
}

export default Ads;
