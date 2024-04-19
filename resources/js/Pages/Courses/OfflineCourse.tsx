import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import CourseActionBottom from '@/Components/Course-Details/Course-Sections/Course-Action-Bottom'
import MasterCourseDetails from '@/Components/Course-Details/MasterCourseDetails'
import OfflineCourseBreadcrumb from '@/Components/Course-Details/OfflineCourseSections/OfflineCourse-Breadcrumb'
import OfflineCourseDetails from '@/Components/Course-Details/OfflineCourseDetails'

export default function CourseIndex({
                                      course, demoLesson, includeCourses
                                    }: PageProps<{ course: any,demoLesson :any, includeCourses: any }>) {
  return (
    <>
      <Head title={course.name} />
      <Guest>
        <div className="rbt-breadcrumb-default rbt-breadcrumb-style-3">
          <div className="breadcrumb-inner">
            <img src={'/images/bg/bg-image-10.jpg'} alt="Education Images" />
          </div>
          <div className="container">
            <div className="row">
              <OfflineCourseBreadcrumb getMatchCourse={course} />
            </div>
          </div>
        </div>

        <div className="rbt-course-details-area ptb--60">
          <div className="container">
            <div className="row g-5">
              <OfflineCourseDetails
                course={course}
                includeCourses={includeCourses}
              />
            </div>
          </div>
        </div>

        <CourseActionBottom
          checkMatchCourses={false}
        />
      </Guest>
    </>
  )
}
