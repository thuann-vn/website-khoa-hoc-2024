import { Head, Link } from '@inertiajs/react'
import 'video.js/dist/video-js.css'
import React from 'react'
import StudentDashboardSidebar from '@/Components/Student/StudentDashboardSidebar'
import Guest from '@/Layouts/GuestLayout'
import CourseWidgets from '@/Components/Instructor/Dashboard-Section/widgets/CourseWidget'

export default function DashboardPage({ courses }: { courses: any[] }) {
  return (
    <Guest
    >
      <Head title="Dashboard" />
      <div className="rbt-page-banner-wrapper">
        <div className="rbt-banner-image" />
      </div>
      <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row g-5">
                <div className="col-lg-3">
                  <StudentDashboardSidebar />
                </div>

                <div className="col-lg-9">
                  <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
                    <div className="content">
                      <div className="section-title">
                        <h4 className="rbt-title-style-3">Khóa học đã đăng ký</h4>
                      </div>
                      <div className="tab-content">
                        <div
                          className="tab-pane fade active show"
                          id="home-4"
                          role="tabpanel"
                          aria-labelledby="home-tab-4"
                        >
                          <div className="row g-5">
                            {courses.map((slide, index) => (
                              <div
                                className="col-lg-4 col-md-6 col-12"
                                key={`course-enrolled-${index}`}
                              >
                                <CourseWidgets
                                  data={slide}
                                  courseStyle="two"
                                  isProgress={true}
                                  isCompleted={false}
                                  isEdit={false}
                                  showDescription={false}
                                  showAuthor={false}
                                />
                              </div>
                            ))}

                            {courses.length === 0 ? (
                              <p>
                                Bạn chưa có khóa học nào.{' '}
                                <Link href={route('courses')}>Đăng ký</Link>
                              </p>
                            ) : null}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Guest>
  )
}
