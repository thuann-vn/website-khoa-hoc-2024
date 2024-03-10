import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import React from 'react'
import StudentDashboardSidebar from '@/Components/Student/StudentDashboardSidebar'
import StudentDashboardHeader from '@/Components/Student/StudentDashboardHeader'
import Dashboard from '@/Components/Student/Dashboard'
import Guest from '@/Layouts/GuestLayout'
export default function DashboardPage({ data }: PageProps) {
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
                  <Dashboard data={data}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Guest>
  );
}
