import { Link } from '@inertiajs/react'
import { getImageStoragePath } from '@/helper'

const CourseBreadcrumb = ({ getMatchCourse }) => {
  return (
    <>
      <div className="col-lg-8">
        <div className="content text-start">
          <ul className="page-list">
            <li className="rbt-breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li>
              <div className="icon-right">
                <i className="feather-chevron-right"></i>
              </div>
            </li>
            <li className="rbt-breadcrumb-item active">
              {getMatchCourse.category?.name}
            </li>
          </ul>
          <h2 className="title">{getMatchCourse.name}</h2>
          {/*<p className="description">{getMatchCourse.description}</p>*/}

          <div className="d-flex align-items-center mb--20 flex-wrap rbt-course-details-feature">
            <div className="feature-sin best-seller-badge">
              <span className="rbt-badge-2">
                <span className="image">
                  <img
                    src={'/images/card-icon-1.webp'}
                    width={30}
                    height={30}
                    alt="Best Seller Icon"
                  />
                </span>
                <span className="text">Khóa học bán chạy</span>
              </span>
            </div>

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
              <span className="rbt-badge-4">
                {getMatchCourse.course_lesson_count} bài học
              </span>
              <span className="rbt-badge-4">
                {getMatchCourse.course_duration_sum} giờ học
              </span>
            </div>
          </div>

          <div className="rbt-author-meta mb--20">
            <div className="rbt-avater">
              <Link href={`/teacher/${getMatchCourse.id}`}>
                {getMatchCourse.teacher.image && (
                  <img
                    width={40}
                    height={40}
                    src={getImageStoragePath(getMatchCourse.teacher.image)}
                    alt={getMatchCourse.teacher.name}
                  />
                )}
              </Link>
            </div>
            <div className="rbt-author-info">
              Giáo viên{" "}
              <Link href={`/teacher/${getMatchCourse.teacher.id}`}>
                {getMatchCourse.teacher.name}
              </Link>{" "}
              trong <Link href="#">{getMatchCourse.category.name}</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseBreadcrumb;
