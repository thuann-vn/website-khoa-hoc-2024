import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import React from 'react'
import LearningLayout from '@/Layouts/LearningLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import { Button, ProgressBar } from 'react-bootstrap'
import { currency, durationToTime } from '@/helper'
export default function DashboardPage({ course, userCourse }: { course: any, userCourse: {course_id: number, course_section_id: number}}) {
  const [activeLesson, setActiveLesson] = React.useState<any>(null);
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
    }],
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

  const startLesson = (lesson: any) => {
    setActiveLesson(lesson);
    const player = playerRef.current;
    // @ts-ignore

    player.src({
      src:  "/video/" + lesson.id,
      type: 'application/x-mpegURL',
      withCredentials: true
    });
  }

  // @ts-ignore
  return (
    <LearningLayout
    >
      <Head title="Dashboard" />
      <header className="learning-header">
        <div className={
          'row'
        }>
          <Link href={route("enrolled-course")} className={'col-md-3 header-left'}>
            <i className="feather-arrow-left"></i> Quay lại trang chủ
          </Link>
          <div className={'col-md-9 text-end'}>
            <div className={"lesson-nav"}>
              <Button variant={"outline-light"}>
                <i className="feather-arrow-left"></i> Bài trước
              </Button>

              <Button variant={"success"}>
                Hoàn thành và tiếp tục <i className="feather-arrow-right"></i>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className={
        'row'
      }>
        <div className={'col-md-3 bottom-left'}>
          <div className={"course-name"}>
            <strong>Khóa học: {course.name}</strong>
            <ProgressBar now={60} className={"course-progress-bar"}/>
            <div className={"course-progress"}>Hoàn thành: 60%</div>
          </div>

          <div className={"course-lesson-list rbt-course-feature-inner"}>
            <div className="rbt-accordion-style rbt-accordion-02 accordion">
              <div className="accordion" id="accordionExampleb2">
                {course.sections && course.sections?.map((item: { collapsed: any; expand: string | boolean | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; duration: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; chapters: { name: string | number | boolean | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; lessons: { name: string | number | boolean | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; duration: number; }[]; }[]; }, innerIndex: number) => (
                  <div className="accordion-item card" key={innerIndex}>
                    <h2
                      className="accordion-header card-header"
                      id={`headingTwo${innerIndex}`}
                    >
                      <button
                        className={`accordion-button ${
                          !item.collapsed ? 'collapsed' : ''
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseTwo${innerIndex + 1}`}
                        aria-controls={`collapseTwo${innerIndex + 1}`}
                      >
                        {item.name}
                        <span className="rbt-badge-5 ml--10">{item.duration} phút</span>
                      </button>
                    </h2>
                    <div
                      id={`collapseTwo${innerIndex + 1}`}
                      className={`accordion-collapse collapse show`}
                      aria-labelledby={`headingTwo${innerIndex}`}
                    >
                      <div className="accordion-body card-body pr--0">
                        <ul className="rbt-course-main-content liststyle">
                          {item.chapters.map((chapter: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; lessons: { name: string | number | boolean | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; duration: number; }[]; }, subIndex: React.Key | null | undefined) => (
                            <li>
                              <h6 className={'mt-5 mb-4 text-uppercase text-bold'}>{chapter.name}</h6>
                              {
                                chapter.lessons.map((lesson: any, lessionIdx: any) => {
                                  return <li key={subIndex}>
                                    <a href="#" onClick={(event)=>{
                                      event.preventDefault();
                                      startLesson(lesson)
                                    }}>
                                      <div className="course-content-left">
                                        {
                                          activeLesson && activeLesson?.id == lesson?.id ? (
                                            <i className="lesson-icon feather-play-circle"></i>
                                          ) : (
                                            <i className="lesson-icon feather-circle"></i>
                                          )
                                        }
                                        <span className="text">{lesson.name} ({durationToTime(lesson.duration)})</span>
                                      </div>
                                    </a>
                                  </li>
                                })
                              }
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={'col-md-9 lesson-outer-container'}>
          <div className={'lesson-container'}>
            <h3 className="lesson-title">{activeLesson?.name}</h3>
            <div className="mt-5">
              <div data-vjs-player="">
                <div ref={videoRef} />
              </div>
            </div>
            <div className={'lesson-content'}>
              <p className="lesson-description" dangerouslySetInnerHTML={{__html: activeLesson?.description}}></p>
              <div className="lesson-action">
                <PrimaryButton>
                  Hoàn thành bài học
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>

        </div>
      </div>
    </LearningLayout>
  );
}
