import { Link } from '@inertiajs/react'
import { currency, getImageStoragePath, formatDateTime } from '@/helper'

const OfflineCourseCardSingle = ({ data, isDesc = true, isUser = true }) => {
  console.log(data)
  return (
    <>
      <div className="rbt-card variation-01 rbt-hover">
        <div className="rbt-card-img">
          <Link href={route('offline-courses-detail', data.slug)}>
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
            <Link href={route('offline-courses-detail', data.slug)}>
              {data.name}
            </Link>
          </h4>

          <ul className="rbt-meta">
            <li>
              <i className="feather-clock"></i>
              Thời gian học: {data.time}
            </li>
            <li>
              <i className="feather-clock"></i>
              Thời gian học thử: {data.period_time}
            </li>
          </ul>
          <p className={'rbt-description'}>
            Lịch khai giảng: <b>{data.type === 'weekly' ? 'Hàng tuần' : formatDateTime(data.start_date)}</b> <br />
            Địa chỉ học: <b>{data.address}</b> <br />
            Có học online: <b>{data.has_online ? 'Có' : 'Không'} {
            data.has_online && data.online_course?.slug && (
              <>
                <span>{' - '}</span><Link href={route('courses-detail', data.online_course?.slug)}>Các bạn tham khảo tại
                đây</Link>
              </>)
          }</b>

          </p>
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
              href={route('offline-courses-detail', data.slug)}
            >
              Xem thêm<i className="feather-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default OfflineCourseCardSingle
