import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className="flex justify-center items-center w-full h-20 px-4 text-white bg-black fixed nav select-none">
            <div className="flex items-center text-3xl font-bold">
                <Link href="/">Canvasify</Link>
            </div>
            <div className="flex items-center ">
                {/* <Button className="mr-4" size="2" variant="solid" asChild={true}>
                    <Link href="/login">
                        <FaSpotify /> Login with Spotify
                    </Link>
                </Button> */}
            </div>
        </div>
    );
};

export default Navbar;
