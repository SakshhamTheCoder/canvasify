import { Outfit } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import './globals.css';
import { Theme } from '@radix-ui/themes';
import Navbar from './components/Navbar';

const myFont = Outfit({ subsets: ['latin'], variable: '--my-font' });

export const metadata = {
    title: 'Canvasify',
    description: 'A website to view your currently playing Spotify song in a beautiful frame.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={myFont.variable}>
                <Theme appearance="dark" accentColor="green" radius="large">
                    <Navbar />
                    {children}
                </Theme>
            </body>
        </html>
    );
}

