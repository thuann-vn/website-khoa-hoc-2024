import React, { useState } from "react";

const Overview = ({ course }) => {
  const [toggle, setToggle] = useState(false);
  const { title, description } = course;

  return (
    <>
      <div
        className={`rbt-course-feature-box overview-wrapper rbt-shadow-box mt--30 has-show-more ${
          toggle ? "active" : ""
        }`}
        id="overview"
      >
        <div className="rbt-course-feature-inner has-show-more-inner-content">
          <div className="section-title">
            <h4 className="rbt-title-style-3">Bạn sẽ học gì ở khóa học này?</h4>
          </div>
          <p>{description}</p>
        </div>
        <div
          className={`rbt-show-more-btn ${toggle ? "active" : ""}`}
          onClick={() => setToggle(!toggle)}
        >
         Xem thêm
        </div>
      </div>
    </>
  );
};

export default Overview;
