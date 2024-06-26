// import Image from "next/image";
import { Link } from '@inertiajs/react'
import { formatDateTime, getImageStoragePath } from '@/helper'
const RecruitmentSingleCard = ({ data }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 col-12">
      <div className="rbt-card variation-02 rbt-hover">
        <div className="rbt-card-img">
          <Link href={route('recruitment.detail', { slug: data.slug })}>
            <img
              src={getImageStoragePath(data.image) || '/images/blog/blog-single-03.png'}
              width={450}
              height={267}
              alt="Card image"
            />{" "}
          </Link>
        </div>
        <div className="rbt-card-body">
          <h5 className="rbt-card-title">
            <Link href={route('recruitment.detail', { slug: data.slug })}>{data.title}</Link>
          </h5>
          <p className="rbt-card-text">
            Vị trí: <b>{data.position}</b><br />
            Mức lương: <b>{data.salary}</b><br />
            Địa điểm làm việc: <b>{data.location}</b>
          </p>
          <div className="rbt-card-bottom">
            <Link
              className="transparent-button"
              href={route('recruitment.detail', { slug: data.slug })}
            >
              Đọc thêm
              <i>
                {" "}
                <svg
                  width="17"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g stroke="#27374D" fill="none" fillRule="evenodd">
                    <path d="M10.614 0l5.629 5.629-5.63 5.629" />
                    <path
                      strokeLinecap="square"
                      d="M.663 5.572h14.594"
                    />
                  </g>
                </svg>
              </i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentSingleCard;
