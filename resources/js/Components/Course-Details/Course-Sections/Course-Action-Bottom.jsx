import { Link } from '@inertiajs/react'

import React, { useState, useEffect } from "react";

const CourseActionBottom = ({ checkMatchCourses }) => {
  const [hideOnScroll, setHideOnScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const ScrollPosition = window.pageYOffset;
      const isHide = ScrollPosition > 4365;

      setHideOnScroll(isHide);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={`rbt-course-action-bottom ${
          hideOnScroll ? "rbt-course-action-active" : ""
        }`}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="section-title text-center text-md-start">
                <h5 className="title mb--0">{checkMatchCourses.courseTitle}</h5>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt_sm--15">
              <div className="course-action-bottom-right rbt-single-group">
                <div className="rbt-single-list rbt-price large-size justify-content-center">
                  <span className="current-price color-primary">
                    ${checkMatchCourses.price}
                  </span>
                  <span className="off-price">
                    ${checkMatchCourses.offPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseActionBottom;
