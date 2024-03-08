import { Link } from '@inertiajs/react'
import { getImageStoragePath } from '@/helper'

const CourseBreadcrumb = ({ getMatchCourse }) => {
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
          <p className="description">{getMatchCourse.description}</p>

          <div className="d-flex align-items-center mb--20 flex-wrap rbt-course-details-feature">
            <div className="feature-sin rating">
              <Link href="#">{getMatchCourse.star || 5}</Link>
              <Link href="#">
                <i className="fa fa-star"></i>
              </Link>
              <Link href="#">
                <i className="fa fa-star"></i>
              </Link>
              <Link href="#">
                <i className="fa fa-star"></i>
              </Link>
              <Link href="#">
                <i className="fa fa-star"></i>
              </Link>
              <Link href="#">
                <i className="fa fa-star"></i>
              </Link>
            </div>

            <div className="feature-sin total-rating">
              <Link className="rbt-badge-4" href="#">
                {getMatchCourse.course_count} khóa học
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseBreadcrumb;
