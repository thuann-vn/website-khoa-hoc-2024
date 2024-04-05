import Content from "./Course-Sections/Content";
import CourseBanner from "./Course-Sections/Course-Banner";
import CourseMenu from "./Course-Sections/Course-Menu";
import Instructor from "./Course-Sections/Instructor";
import Overview from "./Course-Sections/Overview";
import Viedo from "./Course-Sections/Viedo";
import { getImageStoragePath } from '@/helper'
import React, { useState } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import qualitySelector from "jb-videojs-hls-quality-selector";
const CourseDetailsOne = ({ checkMatchCourses, course, demoLesson }) => {

  const videoRef = React.useRef(null)
  const playerRef = React.useRef(null)
  const [player, setPlayer] = useState(undefined);
  const options = {
    playbackRates: [0.25, 0.5, 1, 1.5, 2],
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    seekButtons: {
      forward: 5,
      back: 5,
    },
    html5: {
      hls: {
        withCredentials: true,
      },
    },
  }
  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if(!demoLesson){
      return
    }
    if (!playerRef.current && demoLesson) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered')
      // @ts-ignore
      videoRef.current.appendChild(videoElement)

      // @ts-ignore
      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready')
      })

      player.src({
        src: '/video/' + demoLesson.id,
        type: 'application/x-mpegURL',
        withCredentials: true,
      })
      setPlayer(player);
    } else {
      const player = playerRef.current

      // @ts-ignore
      player.src({
        src: '/video/' + demoLesson.id,
        type: 'application/x-mpegURL',
        withCredentials: true,
      })
    }
  }, [options, videoRef, demoLesson])

  React.useEffect(() => {
    if (player) player.hlsQualitySelector({ displayCurrentQuality: true });
  }, [player]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current

    return () => {
      // @ts-ignore
      if (player && !player.isDisposed()) {
        // @ts-ignore
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <>
      <div className="col-lg-8">
        <div className="course-details-content">
          <div className="rbt-course-feature-box rbt-shadow-box thuumbnail">
            {
              demoLesson ? <>
                <div className="mt-5" id={"demo-video"}>
                  <div data-vjs-player="">
                    <div ref={videoRef} />
                  </div>
                </div>
              </> : <CourseBanner bannerImg={getImageStoragePath(course.image)} />
            }
          </div>
          <div className="rbt-inner-onepage-navigation sticky-top mt--30">
            <CourseMenu />
          </div>


          <Overview course={course} />

          <div
            className="course-content rbt-shadow-box coursecontent-wrapper mt--30"
            id="coursecontent"
          >
            <Content checkMatchCourses={course} />
          </div>
          <div
            className="rbt-instructor rbt-shadow-box intructor-wrapper mt--30"
            id="intructor"
          >
            <Instructor checkMatchCourses={course} />
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="course-sidebar sticky-top rbt-shadow-box course-sidebar-top rbt-gradient-border">
          <div className="inner">
            <Viedo checkMatchCourses={course} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailsOne;
