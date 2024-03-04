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
  const { cartToggle, setCart } = useAppContext();
  const [toggle, setToggle] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);

  // =====> Start ADD-To-Cart
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);

  const [amount, setAmount] = useState(1);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // =====> For video PopUp
  useEffect(() => {
    import("venobox/dist/venobox.min.js").then((venobox) => {
      new venobox.default({
        selector: ".popup-video",
      });
    });

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
      <Link
        className={`video-popup-with-text video-popup-wrapper text-center popup-video sidebar-video-hidden mb--15 ${
          hideOnScroll ? "d-none" : ""
        }`}
        data-vbtype="video"
        href="https://www.youtube.com/watch?v=nA1Aqp0sPQo"
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
          <div className="position-to-top">
            <span className="rbt-btn rounded-player-2 with-animation">
              <span className="play-icon"></span>
            </span>
          </div>
          <span className="play-view-text d-block color-white">
            <i className="feather-eye"></i> Giới thiệu khóa học
          </span>
        </div>
      </Link>
      <div className="content-item-content">
        <div className="rbt-price-wrapper d-flex flex-wrap align-items-center justify-content-between">
          <div className="rbt-price">
            <span className="current-price">{currency(checkMatchCourses.price)}</span>
          </div>
        </div>

        <div className="add-to-card-button mt--15">
          <Link
            className="rbt-btn btn-gradient icon-hover w-100 d-block text-center"
            href={route("courses-checkout", {slug: checkMatchCourses.slug})}
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
