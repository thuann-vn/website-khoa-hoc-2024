import Content from "./Course-Sections/Content";
import CourseBanner from "./Course-Sections/Course-Banner";
import CourseMenu from "./Course-Sections/Course-Menu";
import Featured from "./Course-Sections/Featured";
import Instructor from "./Course-Sections/Instructor";
import Overview from "./Course-Sections/Overview";
import RelatedCourse from "./Course-Sections/RelatedCourse";
import Requirements from "./Course-Sections/Requirements";
import Review from "./Course-Sections/Review";
import Viedo from "./Course-Sections/Viedo";
import { getImageStoragePath } from '@/helper'

const CourseDetailsOne = ({ checkMatchCourses, course }) => {
  return (
    <>
      <div className="col-lg-8">
        <div className="course-details-content">
          <div className="rbt-course-feature-box rbt-shadow-box thuumbnail">
            {course.image && (
              <CourseBanner bannerImg={getImageStoragePath(course.image)} />
            )}
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
        <div className="related-course mt--60">
          {checkMatchCourses &&
            checkMatchCourses.relatedCourse.map((data, index) => (
              <RelatedCourse {...data} key={index} checkMatchCourses={data} />
            ))}
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
