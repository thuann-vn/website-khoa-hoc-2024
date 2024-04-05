import React, { useState, useEffect } from "react";
import { Link, usePage } from '@inertiajs/react'
import "venobox/dist/venobox.min.css";
import { currency, getImageStoragePath } from '@/helper'

const Viedo = ({ checkMatchCourses }) => {
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
      <div className="rbt-price-wrapper d-flex flex-wrap align-items-center justify-content-between">
        <div className="rbt-price">
          <span className="current-price">{currency(checkMatchCourses.price)}</span>
          {
            checkMatchCourses.old_price && <span className="off-price">{currency(checkMatchCourses.old_price)}</span>
          }
        </div>
      </div>

      <div className="add-to-card-button mt--15">
        <Link
          className="rbt-btn btn-gradient icon-hover w-100 d-block text-center"
          href={route("master-class-checkout", { slug: checkMatchCourses.slug })}
        >
          <span className="btn-text">Mua trọn bộ khóa học</span>
          <span className="btn-icon">
              <i className="feather-arrow-right"></i>
            </span>
        </Link>
      </div>
      <span className="subtitle">
          <i className="feather-rotate-ccw"></i> {site_settings.refund_text}
        </span>

      <div className="social-share-wrapper mt--30 text-center">
        <div className="rbt-post-share d-flex align-items-center justify-content-center">
          <ul className="social-icon social-default justify-content-center">
            <li>
              <a href={site_settings.facebook} target={"_blank"}>
                <img src={"/images/facebook.png"} width={36} height={36} />
              </a>
            </li>
            <li>
              <a href={site_settings.zalo} target={"_blank"}>
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

export default Viedo;
