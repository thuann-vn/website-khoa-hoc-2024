
import React, { useEffect, useState } from "react";

import Nav from "../Nav";
import Category from "../Category/Category";
import { useAppContext } from "@/context/Context";
import { Link, usePage } from '@inertiajs/react'
import User from '@/Components/Header/Offcanvas/User.jsx'

const HeaderSeven = ({
  gapSpaceBetween,
  transparent,
  navigationEnd,
  btnClass,
  btnText,
  headerType,
}) => {
  const { mobile, setMobile } = useAppContext();
  const [isSticky, setIsSticky] = useState(false);
  const {auth} = usePage().props

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 180) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={`rbt-header-wrapper ${gapSpaceBetween} ${transparent} ${
          !headerType && isSticky ? "rbt-sticky" : ""
        }`}
      >
        <div className="container">
          <div className={`mainbar-row ${navigationEnd} align-items-center`}>
            <div className="header-left rbt-header-content">
              <div className="header-info">
                <div className="logo">
                  <Link href="/">
                    <img
                      src={"/images/logo.PNG"}
                      width={152}
                      height={50}
                      alt="Education Logo Images"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="rbt-main-navigation d-none d-xl-block">
              <Nav />
            </div>
            <div className="header-right">
              {
                auth.user ? (
                  <ul className="quick-access">

                    <li className="rbt-btn-wrapper d-none d-xl-block">
                      <Link className={`rbt-btn me-4 ${btnClass}`} href={route('enrolled-course')}>
                        <span data-text={`Bắt đầu học`}>Bắt đầu học</span>
                      </Link>
                    </li>

                    <li className="account-access rbt-user-wrapper d-none d-xl-block">
                      <Link href="#">
                        <i className="feather-user"></i>
                        {auth.user.name}
                      </Link>
                      <User user={auth.user}/>
                    </li>
                  </ul>
                ) : (
                  <div className="rbt-btn-wrapper d-none d-xl-block">
                    <Link className={`rbt-btn ${btnClass}`} href={route('login')}>
                      <span data-text={`${btnText}`}>{btnText}</span>
                    </Link>
                  </div>
                )
              }


              <div className="mobile-menu-bar d-block d-xl-none">
                <div className="hamberger">
                  <button
                    className="hamberger-button rbt-round-btn"
                    onClick={() => setMobile(!mobile)}
                  >
                    <i className="feather-menu"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSeven;
