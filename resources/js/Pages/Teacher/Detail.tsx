import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import CourseHead from '@/Components/Course-Details/Course-Sections/course-head'
import CourseDetailsOne from '@/Components/Course-Details/CourseDetails-One'
import CourseActionBottom from '@/Components/Course-Details/Course-Sections/Course-Action-Bottom'
import MasterCourseDetails from '@/Components/Course-Details/MasterCourseDetails'
import MasterCourseBreadcrumb from '@/Components/Course-Details/MasterCourseSections/MasterCourse-Breadcrumb'
import UserProfile from '@/Components/User-Profile/User-Profile'
import Biography from '@/Components/User-Profile/User-Biography'
import UserCourses from '@/Components/User-Profile/User-Courses'
import { Key } from 'react'
import { JSX } from 'react/jsx-runtime'
import Card from '@/Components/Cards/Card'
import CardSingle from '@/Components/Cards/CardSingle'

export default function CourseIndex({
  teacher, includeCourses,
}: PageProps<{ teacher: any, includeCourses: any }>) {
  return (
    <>
      <Head title={teacher.name} />
      <Guest>
        <div className="rbt-page-banner-wrapper">
          <div className="rbt-banner-image"></div>
        </div>
        <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
          <div className="container">
            <div className="row">
              <UserProfile checkMatchProfile={teacher} />
              <Biography checkMatchProfile={teacher} />
            </div>
            <div className="rbt-profile-course-area mt--60">
              <div className="row">
                <div className="col-lg-12">
                  <div className="sction-title">
                    <h2 className="rbt-title-style-3">Khóa học</h2>
                  </div>
                </div>
              </div>
              <div className="row g-5">
                <Card col="col-lg-4 col-md-6 col-sm-12 col-12"
                      mt="" courses={includeCourses} isUser={true} isDesc={true}/>
              </div>
            </div>
          </div>
        </div>
      </Guest>
    </>
  )
}
