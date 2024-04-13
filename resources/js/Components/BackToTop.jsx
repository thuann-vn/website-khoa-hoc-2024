import React, { useEffect, useRef } from "react";
import { Link, usePage } from '@inertiajs/react'

const BackToTop = () => {
  const progressRef = useRef(null);
  const loginButtonRef = useRef(null);
  const { auth } = usePage().props;

  useEffect(() => {
    const progressPath = progressRef.current?.querySelector("path");
    if (!progressPath) return;

    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = "none";
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = "stroke-dashoffset 10ms linear";

    const updateProgress = () => {
      const scroll = window.pageYOffset || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;

      const rbtProgressParent = progressRef.current;
      if (rbtProgressParent) {
        if (scroll > 50) {
          rbtProgressParent.classList.add("rbt-backto-top-active");
          loginButtonRef.current.classList.add("active");
        } else {
          rbtProgressParent.classList.remove("rbt-backto-top-active");
          loginButtonRef.current.classList.remove("active");
        }
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress);

    progressRef.current?.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <>
      <div className="rbt-progress-parent" ref={progressRef}>
        <svg
          className="rbt-back-circle svg-inner"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>

      {
        !auth?.user && (
          <Link className={"rbt-btn me-4 rbt-switch-btn btn-gradient btn-sm hover-transform-none btn-login-fixed"}
                href={route("login")}
            ref={loginButtonRef}
          >
            Đăng nhập để học
          </Link>
        )
      }
    </>
  );
};

export default BackToTop;
