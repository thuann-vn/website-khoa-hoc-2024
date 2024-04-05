import React from 'react'
import { durationToTime } from '@/helper'

const Content = ({ checkMatchCourses, onChangeVideo }) => {
  return (
    <>
      <div className="rbt-course-feature-inner">
        <div className="section-title">
          <h4 className="rbt-title-style-3">Nội dung khóa học</h4>
        </div>
        <div className="rbt-accordion-style rbt-accordion-02 accordion">
          <div className="accordion" id="accordionExampleb2">
            {checkMatchCourses.sections && checkMatchCourses.sections?.map((item, innerIndex) => (
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
                    aria-expanded={item.expand}
                    aria-controls={`collapseTwo${innerIndex + 1}`}
                  >
                    {item.name}
                    <span className="rbt-badge-5 ml--10">{item.duration_sum} phút</span>
                  </button>
                </h2>
                <div
                  id={`collapseTwo${innerIndex + 1}`}
                  className={`accordion-collapse collapse show`}
                  aria-labelledby={`headingTwo${innerIndex}`}
                >
                  <div className="accordion-body card-body pr--0">
                    <ul className="rbt-course-main-content liststyle">
                      {item.chapters.length > 0 ? item.chapters.map((chapter, subIndex) => (
                        <li>
                          <h6 className={'mt-5 mb-4'}>{chapter.name}</h6>
                          {
                            chapter.lessons.map((lesson, lessionIdx) => {
                              return <li key={subIndex}>
                                <a href="javascript:void">
                                  <div className="course-content-left">
                                    <i className="feather-play-circle"></i>
                                    <span className="text">{lesson.name} ({durationToTime(lesson.duration)})</span>
                                  </div>
                                  {lesson.is_trial ? (
                                    <div className="course-content-right">
                                      <span>
                                        <a href={'#demo-video'} onClick={()=>{
                                          onChangeVideo(lesson)
                                        }} className="rbt-badge variation-03 bg-primary-opacity">
                                          <i className="feather-eye"></i> Xem
                                        </a>
                                      </span>

                                    </div>
                                  ) : (
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock"></i>
                                      </span>
                                    </div>
                                  )}
                                </a>
                              </li>
                            })
                          }
                        </li>
                      )) : item.lessons.map((lesson, subIndex) => (
                        <li key={subIndex}>
                          <a href="javascript:void">
                            <div className="course-content-left">
                              <i className="feather-play-circle"></i>
                              <span className="text">{lesson.name} ({durationToTime(lesson.duration)})</span>
                            </div>
                            {lesson.is_trial ? (
                              <div className="course-content-right">
                                  <span>
                                    <a href={'#demo-video'} onClick={()=>{
                                      onChangeVideo(lesson)
                                    }} className="rbt-badge variation-03 bg-primary-opacity">
                                      <i className="feather-eye"></i> Xem
                                    </a>
                                  </span>
                              </div>
                            ) : (
                              <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock"></i>
                                      </span>
                              </div>
                            )}
                          </a>
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
    </>
  )
}

export default Content
