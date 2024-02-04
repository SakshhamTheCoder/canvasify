'use client';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';

export default function Landing() {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.href = '/canvas';
        }
    });
    return (
        <main className="flex min-h-screen flex-col items-center justify-center pt-16">
            <h1 className="text-6xl font-bold text-center">Canvasify</h1>
            <p className="text-2xl text-center">
                A website to view your currently playing Spotify song in a beautiful frame.
            </p>

            <Button className="my-8 text-center" size="4" variant="soft" asChild={true}>
                <Link href="/login">
                    <FaSpotify /> Login With Spotify
                </Link>
            </Button>
            <p className="text-sm text-center">
                This website uses Spotify to authenticate users. Please login with Spotify to continue
            </p>
        </main>
    );
}

