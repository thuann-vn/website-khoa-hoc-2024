import React, { useState } from "react";

import CategoryBanner from "./Category-Banner";
import { useAppContext } from "@/context/Context";

const CategoryHead = ({ category, courses }) => {
  const { toggle, setToggle } = useAppContext();

  return (
    <>
      <div className="rbt-page-banner-wrapper">
        <div className="rbt-banner-image"></div>

        <div className="rbt-banner-content">
          <CategoryBanner category={category} courses={courses}/>

          <div className="rbt-course-top-wrapper mt--40 mt_sm--20">
            <div className="container">
              <div className="row g-5 align-items-center">
                <div className="col-lg-5 col-md-12">
                  <div className="rbt-sorting-list d-flex flex-wrap align-items-center">
                    <div className="rbt-short-item switch-layout-container">
                      <ul className="course-switch-layout">
                        <li className="course-switch-item">
                          <button
                            className={`rbt-grid-view ${
                              toggle ? "active" : ""
                            }`}
                            title="Grid Layout"
                            onClick={() => setToggle(!toggle)}
                          >
                            <i className="feather-grid"></i>{" "}
                            <span className="text">Dạng lưới</span>
                          </button>
                        </li>
                        <li className="course-switch-item">
                          <button
                            className={`rbt-grid-view ${
                              !toggle ? "active" : ""
                            }`}
                            title="List Layout"
                            onClick={() => setToggle(!toggle)}
                          >
                            <i className="feather-list"></i>{" "}
                            <span className="text">Danh sách</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                    {category && (
                      <div className="rbt-short-item">
                        {category.id ? (
                          <span className="course-index">
                            Đang hiển thị từ 1-{category.id} của {category.id}
                          </span>
                        ) : (
                          <span className="course-index">
                            Đang hiển thị 1-{category.length / 2} của {category.length}{" "}
                            kết quả
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/*<div className="col-lg-7 col-md-12">*/}
                {/*  <div className="rbt-sorting-list d-flex flex-wrap align-items-center justify-content-start justify-content-lg-end">*/}
                {/*    <div className="rbt-short-item">*/}
                {/*      <form action="#" className="rbt-search-style me-0">*/}
                {/*        <input type="text" placeholder="Tìm kiếm.." />*/}
                {/*        <button*/}
                {/*          type="submit"*/}
                {/*          className="rbt-search-btn rbt-round-btn"*/}
                {/*        >*/}
                {/*          <i className="feather-search"></i>*/}
                {/*        </button>*/}
                {/*      </form>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryHead;
