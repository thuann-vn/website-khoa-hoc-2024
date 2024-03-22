
import { Link } from '@inertiajs/react'
import { currency, getImageStoragePath } from '@/helper'

const CardSingle = ({ data, isDesc = true, isUser= true }) => {
  return (
    <>
      <div className="rbt-card variation-01 rbt-hover">
        <div className="rbt-card-img">
          <Link href={route('master-class-detail', data.slug)}>
            <img
              src={getImageStoragePath(data.image)}
              width={355}
              height={244}
              alt="Card image"
            />
            {data.old_price > 0 ? (
              <div className="rbt-badge-3 bg-white">
                <span>giảm</span>
                <span>-{Math.round((data.old_price - data.price) * 100 / data.old_price)}%</span>
              </div>
            ) : (
              ''
            )}
          </Link>
        </div>
        <div className="rbt-card-body">
          <h4 className="rbt-card-title">
            <Link href={route('master-class-detail', data.slug)}>
              {data.name}
            </Link>
          </h4>

          <ul className="rbt-meta">
            <li>
              <i className="feather-book"></i>
              {data.course_count} khóa học
            </li>
            <li>
              <i className="feather-clock"></i>
              {data.course_duration_sum} giờ học
            </li>
          </ul>
          {isDesc ? <p className="rbt-card-text">{data.description}</p> : ''}
          <div className="rbt-card-bottom">
          <div className="rbt-price">
              <span className="current-price">{currency(data.price)}</span>
              {
                data.old_price > 0 ? (
                  <span className="off-price">{currency(data.old_price)}</span>
                ) : ''
              }
            </div>
            <Link
              className="rbt-btn-link"
              href={route('master-class-detail', data.slug)}
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
