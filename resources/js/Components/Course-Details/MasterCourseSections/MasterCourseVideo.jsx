import React, { useState, useEffect } from "react";
// import Image from "next/image";
import { Link } from '@inertiajs/react'

import "venobox/dist/venobox.min.css";

import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "@/context/Context";
import { addToCartAction } from "@/redux/action/CartAction";
import { currency, getImageStoragePath } from '@/helper'
import { Button, Modal } from 'react-bootstrap'

const Viedo = ({ checkMatchCourses }) => {
  const [hideOnScroll, setHideOnScroll] = useState(false);

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
          <i className="feather-rotate-ccw"></i> Hoàn tiền 30 ngày
        </span>

        <div className="social-share-wrapper mt--30 text-center">
          <div className="rbt-post-share d-flex align-items-center justify-content-center">
            <ul className="social-icon social-default transparent-with-border justify-content-center">
              <li>
                <Link href="https://www.facebook.com/">
                  <i className="feather-facebook"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.twitter.com">
                  <i className="feather-twitter"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/">
                  <i className="feather-instagram"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.linkdin.com/">
                  <i className="feather-linkedin"></i>
                </Link>
              </li>
            </ul>
          </div>
          <hr className="mt--20" />
          <div className="contact-with-us text-center">
            <p>Thắc mắc về khoá học?</p>
            <p className="rbt-badge-2 mt--10 justify-content-center w-100">
              <i className="feather-phone mr--5"></i> Hotline:{" "}
              <Link href="#">
                <strong>0123456789</strong>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Viedo;
