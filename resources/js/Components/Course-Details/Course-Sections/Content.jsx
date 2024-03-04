import { Link } from '@inertiajs/react'
import React from "react";
import { currency } from '@/helper'

const Content = ({ checkMatchCourses }) => {
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
                  <div
                    className={`accordion-button course-section-title ${
                      !item.collapsed ? 'collapsed' : ''
                    }`}
                  >
                    <div className={"flex"}>
                      {item.name}
                    </div>

                    <div className={'d-flex text-nowrap'}>
                      <div className="rbt-price"><span className="current-price">{currency(item.price)}</span></div>

                      <button className="rbt-btn rbt-switch-btn btn-gradient btn-sm hover-transform-none ms-3 px-3"
                         href="http://localhost:8000/login"><span data-text="Mua phần này">Mua phần này</span></button>
                    </div>
                  </div>
                </h2>
                <div
                  id={`collapseTwo${innerIndex + 1}`}
                  className={`accordion-collapse collapse show`}
                  aria-labelledby={`headingTwo${innerIndex}`}
                >
                  <div className="accordion-body card-body pr--0">
                    <ul className="rbt-course-main-content liststyle">
                      {item.chapters.map((chapter, subIndex) => (
                        <li>
                          <h6 className={"mt-5 mb-4"}>{chapter.name}</h6>
                          {
                            chapter.lessons.map((lesson, lessionIdx) => {
                              return <li key={subIndex}>
                                <a href="#">
                                  <div className="course-content-left">
                                    <i className="feather-play-circle"></i>
                                    <span className="text">{lesson.name}</span>
                                  </div>
                                  {lesson.is_trial ? (
                                    <div className="course-content-right">
                                      <span className="min-lable">{lesson.time}</span>
                                      <span className="rbt-badge variation-03 bg-primary-opacity">
                                  <i className="feather-eye"></i> Xem
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
  );
};

export default Content;
