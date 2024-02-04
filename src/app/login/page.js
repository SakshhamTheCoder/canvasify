'use client';
import { useRouter } from 'next/navigation';

export default function Login() {
    let scope = 'user-read-currently-playing user-read-playback-state user-read-recently-played';
    let client_id = 'fdf449f0c5af44ccb172ee69c2989f42';
    let redirect_uri = 'http://localhost:3000/callback/';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    useRouter().push(url);
}
