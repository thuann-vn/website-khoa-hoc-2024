import { useEffect, useState } from "react";
import { Link } from '@inertiajs/react'
import { getImageStoragePath } from '@/helper'
// import Image from "next/image";

const CourseWidget = ({
  data,
  courseStyle,
  showDescription,
  showAuthor,
  isProgress,
  isCompleted,
  isEdit,
}) => {
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [totalReviews, setTotalReviews] = useState("");
  const [rating, setRating] = useState("");

  const getDiscountPercentage = () => {
    let discount = data.coursePrice * ((100 - data.offerPrice) / 100);
    setDiscountPercentage(discount.toFixed(0));
  };


  useEffect(() => {
    getDiscountPercentage();
  });

  return (
    <>
      <div className="rbt-card variation-01 rbt-hover">
        <div className="rbt-card-img">
          <Link href={route('enrolled-course.learn', data.slug)}>
            <img
              width={330}
              height={227}
              src={getImageStoragePath(data.image)}
              alt={data.name}
            />
            <div className="rbt-badge-3 bg-white">
              <span>{`-${discountPercentage}%`}</span>
              <span>Off</span>
            </div>
          </Link>
        </div>
        <div className="rbt-card-body">
          {courseStyle === "two" && (
            <>
              <h4 className="rbt-card-title">
                <Link href={route('enrolled-course.learn', data.slug)}>{data.name}</Link>
              </h4>
            </>
          )}
          <ul className="rbt-meta">
            <li>
              <i className="feather-book" />
              {data.lectures} Bài học
            </li>
            <li>
              <i className="feather-users" />
              {data.enrolledStudent} Học viên
            </li>
          </ul>

          {isProgress ? (
            <>
              <div className="rbt-progress-style-1 mb--20 mt--10">
                <div className="single-progress">
                  <h6 className="rbt-title-style-2 mb--10">Hoàn thành</h6>
                  {isCompleted ? (
                    <div className="progress">
                      <div
                        className="progress-bar wow fadeInLeft bar-color-success"
                        data-wow-duration="0.5s"
                        data-wow-delay=".3s"
                        role="progressbar"
                        style={{ width: `100%` }}
                        aria-valuenow={100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                      <span className="rbt-title-style-2 progress-number">
                        100%
                      </span>
                    </div>
                  ) : (
                    <div className="progress">
                      <div
                        className="progress-bar wow fadeInLeft bar-color-success"
                        data-wow-duration="0.5s"
                        data-wow-delay=".3s"
                        role="progressbar"
                        style={{ width: `${data.progressValue}%` }}
                        aria-valuenow={data.progressValue}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                      <span className="rbt-title-style-2 progress-number">
                        {data.progressValue}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {courseStyle === "one" && (
            <h4 className="rbt-card-title">
              <Link href="#">{data.title}</Link>
            </h4>
          )}

          {showDescription ? (
            <p className="rbt-card-text">{data.shortDescription}</p>
          ) : (
            ""
          )}

          {courseStyle === "two" && showAuthor && (
            <div className="rbt-author-meta mb--20">
              <div className="rbt-avater">
                <Link href="components/widgets#">
                  <img
                    width={40}
                    height={40}
                    src="/images/client/avater-01.png"
                    alt="Sophia Jaymes"
                  />
                </Link>
              </div>
              <div className="rbt-author-info">
                By <Link href="#">Patrick</Link> In{" "}
                <Link href="#">Languages</Link>
              </div>
            </div>
          )}

          {!isProgress ? (
            <div className="rbt-card-bottom">
              <div className="rbt-price">
                <span className="current-price">${data.offerPrice}</span>
                <span className="off-price">${data.coursePrice}</span>
              </div>

              {isEdit ? (
                <Link className="rbt-btn-link left-icon" href="#">
                  <i className="feather-edit"></i> Edit
                </Link>
              ) : (
                <Link className="rbt-btn-link" href="#">
                  Learn More
                  <i className="feather-arrow-right" />
                </Link>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default CourseWidget;
