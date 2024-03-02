
import CourseDetails from "../../data/course-details/courseData.json";
import { Link } from '@inertiajs/react'
import { currency, getImageStoragePath } from '@/helper'

const Card = ({ courses, col, mt, isDesc, isUser  }) => {
  return (
    <>
      {courses.map((data, index) => (
          <div
            className={`${col} ${mt}`}
            data-sal-delay="150"
            data-sal="slide-up"
            data-sal-duration="800"
            key={index}
          >
            <div className="rbt-card variation-01 rbt-hover">
              <div className="rbt-card-img">
                <Link href={`/course-details/${data.id}`}>
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
                    ""
                  )}
                </Link>
              </div>
              <div className="rbt-card-body">
                <h4 className="rbt-card-title">
                  <Link href={`/course-details/${data.id}`}>
                    {data.courseTitle}
                  </Link>
                </h4>

                <ul className="rbt-meta">
                  <li>
                    <i className="feather-book"></i>
                    {data.course_lesson_count} Lessons
                  </li>
                </ul>
                {isDesc ? <p className="rbt-card-text">{data.description}</p> : ""}
                {isUser ? (
                  <div className="rbt-author-meta mb--10">
                    <div className="rbt-avater">
                      <Link href={`/profile/${data.id}`}>
                        <img
                          src={getImageStoragePath(data.teacher?.image)}
                          width={33}
                          height={33}
                          alt="Sophia Jaymes"
                        />
                      </Link>
                    </div>
                    <div className="rbt-author-info">
                      Giáo viên {" "}
                      <Link href={`/profile/${data.id}`}>{data.teacher?.name}</Link>{" "}
                      trong <Link href="#">{data.category?.name}</Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="rbt-card-bottom">
                  <div className="rbt-price">
                    <span className="current-price">{currency(data.price)}</span>
                  </div>
                  {data.button ? (
                    <Link
                      className="rbt-btn-link left-icon"
                      href={`/course-details/${data.id}`}
                    >
                      <i className="feather-shopping-cart"></i> Add To Cart
                    </Link>
                  ) : (
                    <Link
                      className="rbt-btn-link"
                      href={`/course-details/${data.id}`}
                    >
                      Xem thêm<i className="feather-arrow-right"></i>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Card;
