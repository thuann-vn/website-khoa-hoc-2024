import { Head, Link } from '@inertiajs/react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import React from 'react'
import LearningLayout from '@/Layouts/LearningLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import { Button, ProgressBar } from 'react-bootstrap'
import { durationToTime } from '@/helper'
import axios from 'axios'

export default function DashboardPage({ course, learningProgress }: { course: any, learningProgress: any }) {
  const [activeLesson, setActiveLesson] = React.useState<any>(null)
  const [courseProgress, setCourseProgress] = React.useState<any>(learningProgress)
  const [activeLessonIndex, setActiveLessonIndex] = React.useState<number>(0)
  const [activeChapterIndex, setActiveChapterIndex] = React.useState<number>(0)
  const [activeSectionIndex, setActiveSectionIndex] = React.useState<number>(0)

  const videoRef = React.useRef(null)
  const playerRef = React.useRef(null)
  const options = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
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

  const startLesson = (lesson: any, sectionIndex: number, chapterIndex: number, lessonIndex: number) => {
    if(!lesson){
      return
    }
    setActiveLessonIndex(lessonIndex)
    setActiveChapterIndex(chapterIndex)
    setActiveSectionIndex(sectionIndex)
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

  const updateLessonStatus = (lesson: any, status: string, progress: number, sectionIndex: number, chapterIndex: number, lessonIndex: number) => {
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
    course.sections.forEach((section: any) => {
      section.chapters.forEach((chapter: any) => {
        chapter.lessons.forEach((lesson: any) => {
          total++
          if(courseProgress[lesson.id] && courseProgress[lesson.id].status == 'completed'){
            completed++
          }
        })
      })
    })
    return Math.round((completed / total) * 100)
  }
  const prevLesson = () => {
    let prevLesson = null
    let prevLessonIndex = activeLessonIndex
    let prevChapterIndex = activeChapterIndex
    let prevSectionIndex = activeSectionIndex
    if(activeLessonIndex > 0){
      prevLesson = course.sections[activeSectionIndex]['chapters'][activeChapterIndex]['lessons'][activeLessonIndex - 1]
      prevLessonIndex = activeLessonIndex - 1
    }else if(activeChapterIndex > 0){
      prevLesson = course.sections[activeSectionIndex]['chapters'][activeChapterIndex - 1]['lessons'][course.sections[activeSectionIndex]['chapters'][activeChapterIndex - 1]['lessons'].length - 1]
      prevChapterIndex = activeChapterIndex - 1
      prevLessonIndex = course.sections[activeSectionIndex]['chapters'][activeChapterIndex - 1]['lessons'].length - 1
    }else if(activeSectionIndex > 0){
      prevLesson = course.sections[activeSectionIndex - 1]['chapters'][course.sections[activeSectionIndex - 1]['chapters'].length - 1]['lessons'][course.sections[activeSectionIndex - 1]['chapters'][course.sections[activeSectionIndex - 1]['chapters'].length - 1]['lessons'].length - 1]
      prevSectionIndex = activeSectionIndex - 1
      prevChapterIndex = course.sections[activeSectionIndex - 1]['chapters'].length - 1
      prevLessonIndex = course.sections[activeSectionIndex - 1]['chapters'][course.sections[activeSectionIndex - 1]['chapters'].length - 1]['lessons'].length - 1
    }else{
      prevLesson = null
    }
    setActiveLesson(prevLesson)
    if(prevLesson){
      startLesson(prevLesson, prevSectionIndex, prevChapterIndex, prevLessonIndex)
    }else{
      setActiveLesson(null)
    }
  }

  const nextLesson = () => {
    let nextLesson = null
    let nextLessonIndex = activeLessonIndex
    let nextChapterIndex = activeChapterIndex
    let nextSectionIndex = activeSectionIndex

    if(course.sections[activeSectionIndex]['chapters'][activeChapterIndex]['lessons'].length > activeLessonIndex + 1 && course.sections[activeSectionIndex]['chapters'][activeChapterIndex]['lessons'][activeLessonIndex + 1]){
      nextLesson = course.sections[activeSectionIndex]['chapters'][activeChapterIndex]['lessons'][activeLessonIndex + 1]
     nextLessonIndex = activeLessonIndex + 1
    }else if(course.sections[activeSectionIndex]['chapters'].length > activeChapterIndex + 1 && course.sections[activeSectionIndex]['chapters'][activeChapterIndex + 1]['lessons'].length > 0){
      nextLesson = course.sections[activeSectionIndex]['chapters'][activeChapterIndex + 1]['lessons'][0]
      nextChapterIndex = activeChapterIndex + 1
      nextLessonIndex = 0
    }else if(course.sections.length > activeSectionIndex + 1 && course.sections[activeSectionIndex + 1]['chapters'].length > 0 && course.sections[activeSectionIndex + 1]['chapters'][0]['lessons'].length > 0){
      nextLesson = course.sections[activeSectionIndex + 1]['chapters'][0]['lessons'][0]
      nextSectionIndex = activeSectionIndex + 1
      nextChapterIndex = 0
      nextLessonIndex = 0
    }else{
      nextLesson = null
    }
    setActiveLesson(nextLesson)
    if(nextLesson){
      startLesson(nextLesson, nextSectionIndex, nextChapterIndex, nextLessonIndex)
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
                updateLessonStatus(activeLesson, 'completed', 100, activeSectionIndex, activeChapterIndex, activeLessonIndex)
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
                        <span className="rbt-badge-5 ml--10">{item.duration} phút</span>
                      </button>
                    </h2>
                    <div
                      id={`collapseTwo${sectionIndex + 1}`}
                      className={`accordion-collapse collapse show`}
                      aria-labelledby={`headingTwo${sectionIndex}`}
                    >
                      <div className="accordion-body card-body pr--0">
                        <ul className="rbt-course-main-content liststyle">
                          {item.chapters.map((chapter: {
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
                                  return <li key={chapterIndex}>
                                    <a href="#" onClick={(event) => {
                                      event.preventDefault()
                                      startLesson(lesson, sectionIndex, sectionIndex, lessionIdx)
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
                    <div className="lesson-action">
                      <PrimaryButton onClick={(e)=>{
                        e.preventDefault()
                        updateLessonStatus(activeLesson, 'completed', 100, activeSectionIndex, activeChapterIndex, activeLessonIndex)
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
                     dangerouslySetInnerHTML={{ __html: course?.description }}></p>
                  <div className="lesson-action">
                    <PrimaryButton onClick={(e) => {
                      e.preventDefault()
                      startLesson(course.sections[0]['chapters'][0]['lessons'][0], 0, 0, 0)
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
