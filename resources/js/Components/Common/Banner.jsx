
import React from "react";
import { Link } from '@inertiajs/react'

const Banner = ({ text, col, getBlog,category, description = '' }) => {
  return (
    <>
      <div className="rbt-page-banner-wrapper">
        <div className="rbt-banner-image"></div>
        <div className="rbt-banner-content">
          <div className="rbt-banner-content-top">
            <div className="container">
              <div className="row">
                <div className={col}>
                  <ul className="page-list">
                    <li className="rbt-breadcrumb-item">
                      <Link href="/">Trang chủ</Link>
                    </li>
                    <li>
                      <div className="icon-right">
                        <i className="feather-chevron-right"></i>
                      </div>
                    </li>
                    <li className="rbt-breadcrumb-item active">{text}</li>
                  </ul>

                  <div className=" title-wrapper">
                    <h1 className="title mb--0">{text}</h1>
                    <Link href="#" className="rbt-badge-2">
                      <div className="image">🎉</div>{" "}
                      {getBlog ? `${getBlog.total} Bài đăng` : "0 Bài đăng"}
                    </Link>
                  </div>

                  <p className="description">
                    {category ? category.description  : (description ? description : 'Tổng hợp kiến thức về thiết kế trang sức và chia sẻ kinh nghiệm từ các chuyên gia.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
