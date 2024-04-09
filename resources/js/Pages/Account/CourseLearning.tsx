import { Head, Link } from '@inertiajs/react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import React, { useState } from 'react'
import LearningLayout from '@/Layouts/LearningLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import { Button, ProgressBar } from 'react-bootstrap'
import { durationToTime, getImageStoragePath } from '@/helper'
import axios from 'axios'
import "jb-videojs-hls-quality-selector";

export default function DashboardPage({ course, learningProgress }: { course: any, learningProgress: any }) {
  const [activeLesson, setActiveLesson] = React.useState<any>(null)
  const [courseProgress, setCourseProgress] = React.useState<any>(learningProgress)
  const [activeLessonIndex, setActiveLessonIndex] = React.useState<number>(0)
  const [player, setPlayer] = useState();

  const videoRef = React.useRef(null)
  const playerRef = React.useRef(null)
  const options = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [0.25, 0.5, 1, 1.5, 2],
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
    if(!activeLesson){
      return
    }
    if (!playerRef.current && activeLesson) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered')
      // @ts-ignore
      videoRef.current.appendChild(videoElement)

      // @ts-ignore
      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready')
        // @ts-ignore
        onReady && onReady(player)
      })

      player.src({
        src: '/video/' + activeLesson.id,
        type: 'application/x-mpegURL',
        withCredentials: true,
      })

      // @ts-ignore
      setPlayer(player);
    } else {
      const player = playerRef.current

      // @ts-ignore
      player.src({
        src: '/video/' + activeLesson.id,
        type: 'application/x-mpegURL',
        withCredentials: true,
      })
    }
  }, [options, videoRef, activeLesson])

  React.useEffect(() => {
    // @ts-ignore
    if (player && player.hlsQualitySelector) player.hlsQualitySelector({ displayCurrentQuality: true });
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

  const startLesson = (lesson: any, lessonIndex: number) => {
    if(!lesson){
      return
    }
    setActiveLessonIndex(lessonIndex)
    setActiveLesson(lesson)
    const player = playerRef.current
    courseProgress[lesson.id] = {
      status: 'started',
      progress: 0,
    }

    // @ts-ignore
    player.src({
      src: '/video/' + lesson.id,
      type: 'application/x-mpegURL',
      withCredentials: true,
    })

    if(courseProgress[lesson.id]){
      return
    }
  }

  const updateLessonStatus = (lesson: any, status: string, progress: number) => {
    courseProgress[lesson.id] = {
      status: status,
      progress: progress,
    }
    setCourseProgress({...courseProgress})
    axios.post(route('update-progress'), {
      course_lesson_id: lesson.id,
      course_id: course.id,
      status: status,
      progress: progress,
    }).then((response) => {
      //Find next lesson
      if (status == 'completed') {
        nextLesson()
      }
    })
  }

  const getCourseProgressPercentage = () => {
    let completed = 0
    let total = 0

    //Count completed lessons
    course.lessons.forEach((lesson: any) => {
      total++
      if(courseProgress[lesson.id] && courseProgress[lesson.id].status == 'completed'){
        completed++
      }
    })
    return Math.round((completed / total) * 100)
  }
  const prevLesson = () => {
    let prevLesson = null
    let prevLessonIndex = activeLessonIndex
    if(activeLessonIndex > 0){
      prevLesson = course.lessons[activeLessonIndex - 1]
      prevLessonIndex = activeLessonIndex - 1
    }else{
      prevLesson = null
    }
    setActiveLesson(prevLesson)
    if(prevLesson){
      startLesson(prevLesson, prevLessonIndex)
    }else{
      setActiveLesson(null)
    }
  }

  const nextLesson = () => {
    let nextLesson = null
    let nextLessonIndex = activeLessonIndex

    if(course.lessons.length > activeLessonIndex + 1){
      nextLesson = course.lessons[activeLessonIndex + 1]
      nextLessonIndex = activeLessonIndex + 1
    }else{
      nextLesson = null
    }
    setActiveLesson(nextLesson)
    if(nextLesson){
      startLesson(nextLesson, nextLessonIndex)
    }
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
          <Link href={route('enrolled-course')} className={'col-md-3 header-left'}>
            <i className="feather-arrow-left"></i> Quay lại trang chủ
          </Link>
          <div className={'col-md-9 text-end'}>
            <div className={'lesson-nav'}>
              <Button variant={'outline-light'} disabled={!activeLesson} onClick={()=>{
                prevLesson()
              }}>
                <i className="feather-arrow-left"></i> Bài trước
              </Button>

              <Button variant={'success'} disabled={!activeLesson} onClick={()=>{
                updateLessonStatus(activeLesson, 'completed', 100)
              }}>
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
          <div className={'course-name'}>
            <strong>Khóa học: {course.name}</strong>
            <ProgressBar now={getCourseProgressPercentage()} className={'course-progress-bar'} />
            <div className={'course-progress'}>Hoàn thành: {getCourseProgressPercentage()}%</div>
          </div>

          <div className={'course-lesson-list rbt-course-feature-inner'}>
            <div className="rbt-accordion-style rbt-accordion-02 accordion">
              <div className="accordion" id="accordionExampleb2">
                {course.sections && course.sections?.map((item: {
                  collapsed: any;
                  expand: string | boolean | undefined;
                  name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
                  duration: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
                  duration_sum: number,
                  lessons: {
                    name: string | number | boolean | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined;
                    duration: number;
                  }[];
                  chapters: {
                    name: string | number | boolean | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined;
                    lessons: {
                      name: string | number | boolean | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined;
                      duration: number;
                    }[];
                  }[];
                }, sectionIndex: number) => (
                  <div className="accordion-item card" key={sectionIndex}>
                    <h2
                      className="accordion-header card-header"
                      id={`headingTwo${sectionIndex}`}
                    >
                      <button
                        className={`accordion-button ${
                          !item.collapsed ? 'collapsed' : ''
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseTwo${sectionIndex + 1}`}
                        aria-controls={`collapseTwo${sectionIndex + 1}`}
                      >
                        {item.name}
                        <span className="rbt-badge-5 ml--10">{item.duration_sum} phút</span>
                      </button>
                    </h2>
                    <div
                      id={`collapseTwo${sectionIndex + 1}`}
                      className={`accordion-collapse collapse show`}
                      aria-labelledby={`headingTwo${sectionIndex}`}
                    >
                      <div className="accordion-body card-body pr--0">
                        <ul className="rbt-course-main-content liststyle">
                          {item.chapters.length ? item.chapters.map((chapter: {
                            name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
                            lessons: {
                              name: string | number | boolean | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined;
                              duration: number;
                            }[];
                          }, chapterIndex: React.Key | null | undefined) => (
                            <li>
                              <h6 className={'mt-5 mb-4 text-uppercase text-bold'}>{chapter.name}</h6>
                              {
                                chapter.lessons.map((lesson: any, lessionIdx: any) => {
                                  return <li key={lessionIdx}>
                                    <a href="#" onClick={(event) => {
                                      event.preventDefault()
                                      startLesson(lesson, sectionIndex)
                                    }}>
                                      <div className="course-content-left">
                                        {
                                          activeLesson && activeLesson?.id == lesson?.id ? (
                                            <i className="lesson-icon feather-play-circle"></i>
                                          ) : courseProgress[lesson.id] ? (
                                            courseProgress[lesson.id].status == 'completed' ? (
                                              <i className="lesson-icon feather-check-circle"></i>
                                            ) : (<i className="lesson-icon feather-pause-circle"></i>)

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
                          )) : item.lessons.map((lesson: any, lessionIdx: any) => {
                            return <li key={lessionIdx}>
                              <a href="#" onClick={(event) => {
                                event.preventDefault()
                                startLesson(lesson, lessionIdx)
                              }}>
                                <div className="course-content-left">
                                  {
                                    activeLesson && activeLesson?.id == lesson?.id ? (
                                      <i className="lesson-icon feather-play-circle"></i>
                                    ) : courseProgress[lesson.id] ? (
                                      courseProgress[lesson.id].status == 'completed' ? (
                                        <i className="lesson-icon feather-check-circle"></i>
                                      ) : (<i className="lesson-icon feather-pause-circle"></i>)

                                    ) : (
                                      <i className="lesson-icon feather-circle"></i>
                                    )
                                  }
                                  <span className="text">{lesson.name} ({durationToTime(lesson.duration)})</span>
                                </div>
                              </a>
                            </li>
                          })}
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
          <div className={'lesson-container px-4'}>
            {
              activeLesson ? (
                <div>
                  <h3 className="lesson-title">{activeLesson?.name}</h3>
                  <div className="mt-5">
                    <div data-vjs-player="">
                      <div ref={videoRef} />
                    </div>
                  </div>
                  <div className={'lesson-content'}>
                    <p className="lesson-description"
                       dangerouslySetInnerHTML={{ __html: activeLesson?.description }}></p>
                    {
                      activeLesson && activeLesson.attachments?.length ? (
                        <>
                          <p>
                            <strong>Tệp đính kèm:</strong>
                            <ul>
                              {
                                activeLesson.attachments.map((attachment: any, index: number) => {
                                  return <li key={index}>
                                    <a className={"text-blue-600"} href={getImageStoragePath(attachment)} target="_blank">{attachment}</a>
                                  </li>
                                })
                              }
                            </ul>
                          </p>
                        </>
                      ) : null
                    }
                    <div className="lesson-action">
                      <PrimaryButton onClick={(e)=>{
                        e.preventDefault()
                        updateLessonStatus(activeLesson, 'completed', 100)
                      }}>
                        Hoàn thành bài học
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="lesson-title">{course?.name}</h3>
                  <p className="lesson-description"
                     dangerouslySetInnerHTML={{ __html: course?.description }}></p>{
                  activeLesson && activeLesson.attachments?.length ? (
                    <>
                      <p>
                        <strong>Tệp đính kèm:</strong>
                        <ul>
                          {
                            activeLesson.attachments.map((attachment: any, index: number) => {
                              return <li key={index}>
                                <a className={"text-blue-600"} href={getImageStoragePath(attachment)} target="_blank">{attachment}</a>
                              </li>
                            })
                          }
                        </ul>
                      </p>
                    </>
                  ) : null
                }
                  <div className="lesson-action">
                    <PrimaryButton onClick={(e) => {
                      e.preventDefault()

                      //Find and continue the lesson
                      if(Object.keys(courseProgress).length){
                        course.lessons.forEach((lesson: any, index: number) => {
                          if(!courseProgress[lesson.id] || courseProgress[lesson.id].status != 'completed'){
                            return startLesson(lesson, index)
                          }
                        })
                        startLesson(course.lessons[0], 0)
                      }else {
                        startLesson(course.lessons[0], 0)
                      }
                    }}>
                      Bắt đầu học
                    </PrimaryButton>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <div>
        <div>

        </div>
      </div>
    </LearningLayout>
  )
}
