import React, { useState, useEffect } from "react";
import { Link, usePage } from '@inertiajs/react'
import "venobox/dist/venobox.min.css";
import { currency, getImageStoragePath } from '@/helper'

const OfflineCourseVideo = ({ checkMatchCourses }) => {
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const { site_settings  } = usePage().props;

  // =====> For video PopUp
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isHide = currentScrollPos > 200;

      setHideOnScroll(isHide);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    <div className="content-item-content">
      <a
        className={`video-popup-with-text video-popup-wrapper text-center sidebar-video-hidden mb--15 ${
          hideOnScroll ? "d-none" : ""
        }`}
        href="#demo-video"
      >
        <div className="video-content">
          {checkMatchCourses.image && (
            <img
              className="w-100 rbt-radius"
              src={getImageStoragePath(checkMatchCourses.image)}
              width={355}
              height={255}
              alt="Video Images"
            />
          )}
        </div>
      </a>
      <div className="rbt-price-wrapper">
        {
          checkMatchCourses.old_price ? (
            <div>
              <span className="old-price">{currency(checkMatchCourses.old_price)}</span>
              <br/>
            </div>
          ) : null
        }
        <div className="rbt-price">
          <span className="current-price">{currency(checkMatchCourses.price)}</span>
        </div>
      </div>

      <div className="add-to-card-button mt--15">
        <Link
          className="rbt-btn btn-gradient icon-hover w-100 d-block text-center"
          href={route("offline-courses-checkout", { slug: checkMatchCourses.slug })}
        >
          <span className="btn-text">Đăng ký học</span>
          <span className="btn-icon">
              <i className="feather-arrow-right"></i>
            </span>
        </Link>
      </div>
      {
        checkMatchCourses.one_on_one_price ? (
          <>
            <hr/>
            <div className="rbt-price-wrapper">
              {
                checkMatchCourses.old_one_on_one_price ? (
                  <div>
                    <span className="old-price">{currency(checkMatchCourses.old_one_on_one_price)}</span>
                    <br/>
                  </div>
                ) : null
              }
              <div className="rbt-price">
                <span className="current-price">{currency(checkMatchCourses.one_on_one_price)}</span>
              </div>
            </div>
            <div className="add-to-card-button mt--15">
              <Link
                className="rbt-btn btn-gradient icon-hover w-100 d-block text-center"
                href={route('master-class-checkout', { slug: checkMatchCourses.slug, type: 'one-on-one' })}
              >
                <span className="btn-text">Học 1-1 với giáo viên</span>
                <span className="btn-icon">
              <i className="feather-arrow-right"></i>
            </span>
              </Link>
            </div>
          </>
        ) : null
      }

      <span className="subtitle">
          <i className="feather-rotate-ccw"></i> {site_settings.refund_text}
        </span>

      <div className="social-share-wrapper mt--30 text-center">
        <div className="rbt-post-share d-flex align-items-center justify-content-center">
          <ul className="social-icon social-default justify-content-center">
            <li>
              <a href={site_settings.messenger} target={'_blank'}>
                <img src={'/images/fb.png'} width={36} height={36} />
              </a>
            </li>
            <li>
              <a href={site_settings.zalo} target={'_blank'}>
                <img src={'/images/zalo.png'} width={36} height={36} />
              </a>
            </li>
          </ul>
        </div>
        <hr className="mt--20" />
        <div className="contact-with-us text-center">
          <p>Thắc mắc về khoá học?</p>
          <p className="rbt-badge-2 mt--10 justify-content-center w-100">
            <i className="feather-phone mr--5"></i> Hotline:{" "}
            <a href={`tel:${site_settings.phone}`} target={"_blank"}>
              <strong>{site_settings.phone}</strong>
            </a>
          </p>
        </div>
      </div>
    </div>
</>
)
  ;
};

export default OfflineCourseVideo;
