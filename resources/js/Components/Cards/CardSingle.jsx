
import { Link } from '@inertiajs/react'
import { currency, getImageStoragePath } from '@/helper'

const CardSingle = ({ data, isDesc, isUser  }) => {
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
                    alt={data.teacher?.name}
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
