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
            giảng: <i>{getMatchCourse.type === 'weekly' ? 'Hàng tuần' : formatDateTime(getMatchCourse.start_date)}</i>
            <br />
            Địa chỉ học: <i>{getMatchCourse.address}</i> <br />
            Có học online: <i>{getMatchCourse.has_online ? 'Có' : 'Không'} {
            getMatchCourse.has_online && getMatchCourse.online_course?.slug && (
              <>
                <span>{' - '}</span><Link href={route('courses-detail', getMatchCourse.online_course?.slug)}>Các bạn tham
                khảo tại
                đây</Link>
              </>)
          }</i> <br />
            Chuẩn bị: <i>{getMatchCourse.prepare}</i> <br />
          </p>
        </div>
      </div>
    </>
);
};

export default OfflineCourseBreadcrumb;
