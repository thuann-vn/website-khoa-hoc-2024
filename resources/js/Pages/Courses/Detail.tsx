import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import CourseHead from '@/Components/Course-Details/Course-Sections/course-head'
import CourseDetailsOne from '@/Components/Course-Details/CourseDetails-One'
import CourseActionBottom from '@/Components/Course-Details/Course-Sections/Course-Action-Bottom'
import SimilarCourses from '@/Components/Course-Details/Course-Sections/SimilarCourses'

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

        <div className="modal"  id="registerModal" tabIndex={1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Đăng ký khóa học</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </Guest>
    </>
  )
}
