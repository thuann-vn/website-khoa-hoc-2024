
import { Link, usePage } from '@inertiajs/react'
import { currency, getImageStoragePath } from '@/helper'

const CardSingle = ({ data, isDesc, isUser  }) => {
  const {auth} = usePage().props
  return (
    <>
      <div className="rbt-card variation-01 rbt-hover">
        <div className="rbt-card-img">
          <Link href={route('courses-detail', data.slug)}>
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
            <Link href={route('courses-detail', data.slug)}>
              {data.name}
            </Link>
          </h4>

          <ul className="rbt-meta">
            <li>
              <i className="feather-book"></i>
              {data.course_lesson_count} bài học
            </li>
            <li>
              <i className="feather-clock"></i>
              {data.course_duration_sum} giờ học
            </li>
          </ul>

          {
            auth.user && data.progress !== false ? (
              <>
                <div className="rbt-progress-style-1 mb--20 mt--10">
                  <div className="single-progress">
                    <h6 className="rbt-title-style-2 mb--10">Hoàn thành</h6>
                    {data.progress == 100 ? (
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
                          style={{ width: `${data.progress}%` }}
                          aria-valuenow={data.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                        <span className="rbt-title-style-2 progress-number">
                        {data.progress}%
                      </span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : null
          }

          {isDesc ? <div className="rbt-card-text block overflow-hidden" style={{
            "WebkitLineClamp": "5",
            "display": "-webkit-box",
            "WebkitBoxOrient": "vertical",
            "overflow": "hidden",
          }} data-line-clamp={3} dangerouslySetInnerHTML={{__html: (data.excerpt ?? '').substring(0, 150) + '...'}}></div> : ''}
          {isUser ? (
            <div className="rbt-author-meta mb--10">
              <div className="rbt-avater">
                <Link href={`/teacher/${data.id}`}>
                  <img
                    src={getImageStoragePath(data.teacher?.image)}
                    width={33}
                    height={33}
                    alt={data.teacher?.name}
                  />
                </Link>
              </div>
              <div className="rbt-author-info">
                Giáo viên {" "}
                <Link href={`/teacher/${data.teacher?.id}`}>{data.teacher?.name}</Link>{" "}
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
            <Link
              className="rbt-btn-link"
              href={route('courses-detail', data.slug)}
            >
              Xem thêm<i className="feather-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSingle;
