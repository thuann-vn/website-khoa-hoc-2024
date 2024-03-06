import DeleteUserForm from './Partials/DeleteUserForm'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'
import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import StudentDashboardSidebar from '@/Components/Student/StudentDashboardSidebar'
import React from 'react'
import Guest from '@/Layouts/GuestLayout'

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{
  mustVerifyEmail: boolean,
  status?: string
}>) {
  return (
    <Guest>
      <Head title="Profile" />

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
                        <h4 className="rbt-title-style-3">Tài khoản của tôi</h4>
                      </div>

                      <div className="advance-tab-button mb--30">
                        <ul
                          className="nav nav-tabs tab-button-style-2 justify-content-start"
                          id="settinsTab-4"
                          role="tablist"
                        >
                          <li role="presentation">
                            <Link
                              href="#"
                              className="tab-button active"
                              id="profile-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#profile"
                              role="tab"
                              aria-controls="profile"
                              aria-selected="true"
                            >
                              <span className="title">Thông tin của bạn</span>
                            </Link>
                          </li>
                          <li role="presentation">
                            <Link
                              href="#"
                              className="tab-button"
                              id="password-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#password"
                              role="tab"
                              aria-controls="password"
                              aria-selected="false"
                            >
                              <span className="title">Đổi mật khẩu</span>
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className="tab-content">
                        <div
                          className="tab-pane fade active show"
                          id="profile"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                        >
                          <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                          />
                        </div>

                        <div
                          className="tab-pane fade"
                          id="password"
                          role="tabpanel"
                          aria-labelledby="password-tab"
                        >

                          <UpdatePasswordForm className="max-w-xl" />
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
