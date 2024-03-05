import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import React from 'react'
export default function Dashboard({ auth, onReady }: PageProps) {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const options = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    html5:{
      hls: {
        withCredentials: true
      }
    },
    sources: [{
      src: '/video/1',
      type: 'application/x-mpegURL',
      withCredentials: true
    }]
  };
  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      // @ts-ignore
      videoRef.current.appendChild(videoElement);

      // @ts-ignore
      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        // @ts-ignore
        onReady && onReady(player);
      });

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      // @ts-ignore
      player.autoplay(options.autoplay);
      // @ts-ignore
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      // @ts-ignore
      if (player && !player.isDisposed()) {
        // @ts-ignore
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">You're logged in!</div>
                    <div data-vjs-player>
                      <div ref={videoRef} />
                    </div>
                  </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
