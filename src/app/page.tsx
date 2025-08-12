import Banner from '@/components/banner';
import Welcome from '@/components/Welcome';

export default function Home() {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-7 flex justify-start">
                <Welcome />
            </div>
            <div className="col-span-5">
                <Banner />
            </div>
        </div>
    );
}
