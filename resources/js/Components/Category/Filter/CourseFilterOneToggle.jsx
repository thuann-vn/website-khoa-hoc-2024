import { useEffect, useState } from "react";

import { useAppContext } from "@/context/Context";

import { Link } from '@inertiajs/react'
import Pagination from '@/Components/Common/Pagination.jsx'
import { currency, getImageStoragePath } from '@/helper'

const CourseFilterOneToggle = ({ course, start, end }) => {
  const { toggle } = useAppContext();
  const [courses, setCourse] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const startIndex = (page - 1) * 6;

  const getSelectedCourse = courses.slice(startIndex, startIndex + 6);

  const handleClick = (num) => {
    setPage(num);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setCourse(course);
    setTotalPages(Math.ceil(course.length / 6));
  }, [setTotalPages, setCourse, getSelectedCourse]);

  return (
    <>
      <div
        className={`rbt-course-grid-column ${
          !toggle ? "active-list-view" : ""
        }`}
      >
        {course.slice(start, end).map((data, index) => (
          <div className="course-grid-3" key={index}>
            <div
              className={`rbt-card variation-01 rbt-hover ${
                !toggle ? "card-list-2" : ""
              }`}
            >
              <div className="rbt-card-img">
                <Link href={route("courses-detail", data.slug)}>
                  <img
                    src={getImageStoragePath(data.image)}
                    width={355}
                    height={244}
                    alt="Card image"
                  />
                  {data.offPrice > 0 ? (

                    <div className="rbt-badge-3 bg-white">
                      <span>-{data.offPrice}%</span>
                      <span>Off</span>
                    </div>
                  ) : (
                    ''
                  )}
                </Link>
              </div>
              <div className="rbt-card-body">
                <h4 className="rbt-card-title">
                  <Link href={route("courses-detail", data.slug)}>
                    {data.name}
                  </Link>
                </h4>

                <ul className="rbt-meta">
                  <li>
                    <i className="feather-book"></i>
                    {data.course_lesson_count} bài học
                  </li>
                </ul>

                <p className="rbt-card-text">{data.description}</p>
                <div className="rbt-author-meta mb--10">
                  <div className="rbt-avater">
                    <Link href={route("courses-detail", data.slug)}>
                      <img
                        src={getImageStoragePath(data.teacher?.image)}
                        width={33}
                        height={33}
                        alt={data.teacher?.name}
                      />
                    </Link>
                  </div>
                  <div className="rbt-author-info">
                    Giáo viên {' '}
                    <Link href={`/teacher/${data.teacher?.id}`}>{data.teacher?.name}</Link>{' '}
                    trong <Link href="#">{data.category?.name}</Link>
                  </div>
                </div>
                <div className="rbt-card-bottom">
                  <div className="rbt-price">

                    <span className="current-price">{currency(data.price)}</span>
                  </div>
                  <Link
                    className="rbt-btn-link"
                    href={`/course-details/${data.id}`}
                  >
                    Xem thêm<i className="feather-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {course.length > 6 ? (
        <div className="row">
          <div className="col-lg-12 mt--60">
            <Pagination
              totalPages={totalPages}
              pageNumber={page}
              handleClick={handleClick}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CourseFilterOneToggle;
