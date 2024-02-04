'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
    var router = useRouter();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.href = '/canvas';
        }
        let scope = 'user-read-currently-playing user-read-playback-state user-read-recently-played';
        let client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
        let redirect_uri = 'https://canvasify-stg.vercel.app/callback/';
        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&show_dialog=true';
        router.push(url);
    });
}
