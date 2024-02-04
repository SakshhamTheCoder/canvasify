'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Login() {
    var router = useRouter();
    useEffect(() => {
        const hash = window.location.hash;
        var code = hash.split('&')[0].split('=')[1];
        if (code === undefined || code === null) {
            console.log('No code');
            return router.push('/');
        }
        localStorage.setItem('token', code);
        console.log(localStorage.getItem('token'));
        return router.push('/canvas');
    });
}
