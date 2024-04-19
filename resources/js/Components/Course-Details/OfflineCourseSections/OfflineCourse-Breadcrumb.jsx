import { Link } from '@inertiajs/react'
import { formatDateTime, getImageStoragePath } from '@/helper'

const OfflineCourseBreadcrumb = ({ getMatchCourse }) => {
  return (
    <>
      <div className="col-lg-8">
        <div className="content text-start">
          <ul className="page-list">
            <li className="rbt-breadcrumb-item">
              <Link href="/">Trang chủ</Link>
            </li>
            <li>
              <div className="icon-right">
                <i className="feather-chevron-right"></i>
              </div>
            </li>
            <li className="rbt-breadcrumb-item active">
              {getMatchCourse?.name}
            </li>
          </ul>
          <h2 className="title">{getMatchCourse.name}</h2>
          <div className="d-flex align-items-center mb--20 flex-wrap rbt-course-details-feature">
            <div>
              <div className="rbt-badge-4 mr--5">
                Thời gian học: {getMatchCourse.time}
              </div>
            </div>
            <div>
              <div className="rbt-badge-4">
                Học thử: {getMatchCourse.period_time}
              </div>
            </div>
          </div>
          <p className={'description'}>
            Lịch khai
            giảng: <b>{getMatchCourse.type === 'weekly' ? 'Hàng tuần' : formatDateTime(getMatchCourse.start_date)}</b>
            <br />
            Địa chỉ học: <b>{getMatchCourse.address}</b> <br />
            Có học online: <b>{getMatchCourse.has_online ? 'Có' : 'Không'} {
            getMatchCourse.has_online && getMatchCourse.online_course?.slug && (
              <>
                <span>{' - '}</span><Link href={route('courses-detail', getMatchCourse.online_course?.slug)}>Các bạn tham
                khảo tại
                đây</Link>
              </>)
          }</b> <br />
            Chuẩn bị: <b>{getMatchCourse.prepare}</b> <br />
          </p>
        </div>
      </div>
    </>
);
};

export default OfflineCourseBreadcrumb;
