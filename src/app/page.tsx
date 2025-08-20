import Banner from '@/components/banner';
import Welcome from '@/components/Welcome';

export default function Home() {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-7 flex justify-center lg:justify-start">
                <Welcome />
            </div>
            <div className="col-span-12 mt-6 lg:col-span-5 lg:mt-0">
                <Banner />
            </div>
        </div>
    );
}
