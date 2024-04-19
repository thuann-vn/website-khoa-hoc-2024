import React, { useState } from 'react'
import 'video.js/dist/video-js.css'
import Card from '@/Components/Cards/Card.jsx'
import OfflineCourseVideo from '@/Components/Course-Details/OfflineCourseSections/OfflineCourseVideo.jsx'
import Instructor from '@/Components/Course-Details/Course-Sections/Instructor.jsx'

const OfflineCourseDetails = ({ course, includeCourses }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className="col-lg-8">
        <div
          className={`rbt-course-feature-box overview-wrapper rbt-shadow-box mt--30 has-show-more ${
            toggle ? "active" : ""
          }`}
          id="overview"
        >
          <div className="rbt-course-feature-inner has-show-more-inner-content">
            <div className="section-title">
              <h4 className="rbt-title-style-3">Chương trình học</h4>
            </div>
            <div dangerouslySetInnerHTML={{ __html: course.content }}></div>
          </div>
          <div
            className={`rbt-show-more-btn ${toggle ? "active" : ""}`}
            onClick={() => setToggle(!toggle)}
          >
            Xem thêm
          </div>
        </div>
        <div
          className="rbt-instructor rbt-shadow-box intructor-wrapper mt--30"
          id="intructor"
        >
          <Instructor checkMatchCourses={course} />
        </div>
      </div>

      <div className="col-lg-4">
        <div className="course-sidebar sticky-top rbt-shadow-box course-sidebar-top rbt-gradient-border">
          <div className="inner">
            <OfflineCourseVideo checkMatchCourses={course} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OfflineCourseDetails;
