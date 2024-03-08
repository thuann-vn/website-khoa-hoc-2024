import CourseBanner from "./Course-Sections/Course-Banner";
import { getImageStoragePath } from '@/helper'
import React from 'react'
import 'video.js/dist/video-js.css'
import MasterCourseVideo from '@/Components/Course-Details/MasterCourseSections/MasterCourseVideo.jsx'
import { Link } from '@inertiajs/react'
import Card from '@/Components/Cards/Card.jsx'

const CourseDetailsOne = ({ course, includeCourses }) => {
  return (
    <>
      <div className="col-lg-8">
        <div className="course-details-content">
          <div className="rbt-course-feature-box rbt-shadow-box thuumbnail">
            <div dangerouslySetInnerHTML={{ __html: course.content }}></div>
          </div>
          <div className="rbt-featured-course bg-color-white mt--30">
            <div className="container">
              <div className="row g-5 align-items-end mb--30">
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="section-title text-start">
                    <h2 className="title">Danh sách khóa học</h2>
                    <p className="description mt--20">
                      Các khóa học trong Master Class này
                    </p>
                  </div>
                </div>
              </div>

              <div className="row g-5">
                <Card
                  col="col-lg-6 col-md-6 col-sm-12 col-12"
                  mt=""
                  isDesc={true}
                  isUser={true}
                  courses={includeCourses}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="course-sidebar sticky-top rbt-shadow-box course-sidebar-top rbt-gradient-border">
          <div className="inner">
            <MasterCourseVideo checkMatchCourses={course} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailsOne;
