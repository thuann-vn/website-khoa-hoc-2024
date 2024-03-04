import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import CourseHead from '@/Components/Course-Details/Course-Sections/course-head'
import CourseDetailsOne from '@/Components/Course-Details/CourseDetails-One'
import CourseActionBottom from '@/Components/Course-Details/Course-Sections/Course-Action-Bottom'
import SimilarCourses from '@/Components/Course-Details/Course-Sections/SimilarCourses'
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'

export default function CourseIndex({
                                      course
                                    }: PageProps<{ course: any }>) {
  return (
    <>
      <Head title={course.name} />
      <Guest>
        <div className="rbt-breadcrumb-default rbt-breadcrumb-style-3">
          <CourseHead
            checkMatch={course}
          />
        </div>

        <div className="rbt-course-details-area ptb--60">
          <div className="container">
            <div className="row g-5">
              <CourseDetailsOne
                checkMatchCourses={false}
                course={course}
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
