// import Image from "next/image";
import React from "react";

import bgImage from "../../../../public/images/bg/bg-image-22.webp";
import { getImageStoragePath } from '@/helper'

const UserProfile = ({ checkMatchProfile }) => {
  return (
    <>
      <div className="col-lg-12">
        <div className="rbt-dashboard-content-wrapper">
          <div className="tutor-bg-photo bg_image bg_image--22 height-350">
            <img src={bgImage} alt="" />
          </div>
          <div className="rbt-tutor-information">
            <div className="rbt-tutor-information-left">
              <div className="thumbnail rbt-avatars size-lg">
                <img
                  src={getImageStoragePath(checkMatchProfile.image)}
                  width={250}
                  height={250}
                  alt="Instructor"
                />
              </div>
              <div className="tutor-content">
                <h5 className="title">{checkMatchProfile.name}</h5>
                <div className="rbt-review">
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="rating-count">
                          {" "}
                    (25 Đánh giá)
                        </span>
                </div>
                <ul className="rbt-meta rbt-meta-white mt--5">
                  <li>
                    <i className="feather-book"></i>
                    {checkMatchProfile.course_count} Khóa học
                  </li>
                  <li>
                    <i className="feather-users"></i>
                    {checkMatchProfile.student_count} Học viên
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
