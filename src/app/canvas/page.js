'use client';
import { Button } from '@radix-ui/themes';
import * as Progress from '@radix-ui/react-progress';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SpotifyWebApi from 'spotify-web-api-js';
import { millisToMinutesAndSeconds } from '@/utils/time';

export default function Canvas() {
    var router = useRouter();
    var spotify = new SpotifyWebApi();
    var [user, setUser] = useState(null);
    var [nowPLaying, setNowPlaying] = useState(null);
    var token;
    useEffect(() => {
        token = localStorage.getItem('token');
        if (token === undefined || token === null) {
            router.push('/');
        }
        spotify.setAccessToken(token);
        spotify
            .getMe()
            .then((data) => {
                console.log(data);
                setUser(data);
            })
            .catch((err) => {
                if (err.status === 401) {
                    localStorage.removeItem('token');
                    alert('Token Expired. Please login again.');
                    router.push('/');
                }
            });
    }, [token]);
    var getCurrentPlayer = () => {
        spotify
            .getMyCurrentPlaybackState()
            .then((data) => {
                console.log(data);
                if (data === undefined || data === null || data === '') {
                    return;
                }
                setNowPlaying(data);
            })
            .catch((err) => {
                if (err.status === 401) {
                    localStorage.removeItem('token');
                    alert('Token Expired. Please login again.');
                    router.push('/');
                }
            });
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-center pt-16 w-full">
            {user == null ? (
                <p className="text-2xl text-center">Loading...</p>
            ) : (
                <>
                    <div className="flex justify-center flex-col m-4 rounded-3xl bg-zinc-900 w-full md:w-1/2">
                        <div className="m-5 flex justify-center items-center flex-col sm:flex-row">
                            <img
                                src={
                                    user.images[1] == null
                                        ? 'https://i.scdn.co/image/ab67616d00001e0299760923cfbfe739fb870817'
                                        : user.images[1].url
                                }
                                alt={user.display_name}
                                width={150}
                                height={150}
                                className="rounded-full mx-2"
                            />

                            <div className="flex flex-col items-center justify-center">
                                <h1 className="text-4xl font-bold text-center m-2 overflow-ellipsis">
                                    Hi {user.display_name}
                                </h1>
                                <p className="text-center mb-2">Total Followers: {user.followers.total}</p>
                                <Button
                                    size="3"
                                    variant="outline"
                                    asChild={true}
                                    className="cursor-pointer self-center m-2 text-center"
                                >
                                    <a href={user.external_urls.spotify} target="_blank" rel="noreferrer">
                                        Open Spotify Profile
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <hr className="w-3/4 h-1 mx-auto border-0 rounded bg-zinc-700" />
                        <div className="flex justify-center items-center flex-col sm:flex-row my-5">
                            <Button
                                size="3"
                                variant="solid"
                                asChild={true}
                                className="cursor-pointer self-center m-2"
                                onClick={() => getCurrentPlayer()}
                            >
                                <p>Update Player Canvas</p>
                            </Button>
                            <Button
                                size="3"
                                variant="solid"
                                color="red"
                                asChild={true}
                                className="cursor-pointer self-center m-2"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    router.push('/');
                                }}
                            >
                                <p>Logout</p>
                            </Button>
                        </div>
                    </div>
                    {nowPLaying == null ? (
                        <p className="text-2xl text-center">
                            No songs currently playing. Try clicking Update Button again.
                        </p>
                    ) : (
                        <div
                            id="player-canvas"
                            style={{
                                '--image-url': `url(${nowPLaying.item.album.images[0].url})`,
                            }}
                            className={
                                'pointer-events-none select-none w-full md:w-1/2 rounded-3xl bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat'
                            }
                        >
                            <div className="backdrop-blur-3xl backdrop-brightness-75 flex flex-col items-center p-4 rounded-3xl md:justify-evenly md:flex-row ">
                                <img
                                    src={nowPLaying.item.album.images[1].url}
                                    alt={nowPLaying.item.album.name}
                                    width={150}
                                    height={150}
                                    className="rounded-lg m-4"
                                />
                                <div className="flex justify-center items-center flex-col flex-grow mx-4">
                                    <h1 className="sm:text-4xl text-3xl font-bold text-center mx-3 overflow-ellipsis">
                                        {nowPLaying.item.name}
                                    </h1>
                                    <p className="sm:text-2xl text-xl text-center">{nowPLaying.item.artists[0].name}</p>
                                    <div className="hidden w-full sm:block md:w-3/4 mt-5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs">
                                                {millisToMinutesAndSeconds(nowPLaying.progress_ms)}
                                            </p>
                                            <p className="text-xs">
                                                {millisToMinutesAndSeconds(nowPLaying.item.duration_ms)}
                                            </p>
                                        </div>
                                        <Progress.Root className=" bg-zinc-700 rounded-full h-1 mt-1">
                                            <Progress.Indicator
                                                className="bg-white h-1 rounded-full"
                                                style={{
                                                    width: `${
                                                        (nowPLaying.progress_ms / nowPLaying.item.duration_ms) * 100
                                                    }%`,
                                                }}
                                            />
                                        </Progress.Root>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}
