// import Image from "next/image";
import { Link } from '@inertiajs/react'
import React from "react";
import { getImageStoragePath } from '@/helper'

const Instructor = ({ checkMatchCourses }) => {
  const teacher = checkMatchCourses.teacher;
  return (
    <>
      <div className="about-author border-0 pb--0 pt--0">
        <div className="section-title mb--30">
          <h4 className="rbt-title-style-3">Giáo viên</h4>
        </div>
        <div className="media align-items-center">
          <div className="thumbnail">
            <Link href={getImageStoragePath(teacher?.image)}>
              <img
                src={getImageStoragePath(teacher?.image)}
                width={250}
                height={250}
                alt={teacher.name}
              />
            </Link>
          </div>
          <div className="media-body">
            <div className="author-info">
              <h5 className="title">
                <Link
                  className="hover-flip-item-wrapper"
                  href={`/profile/${teacher.id}`}
                >
                  {teacher.name}
                </Link>
              </h5>
              <span className="b3 subtitle">Giáo viên</span>
              <ul className="rbt-meta mb--20 mt--10">
                <li>
                  <Link href="#">
                    <i className="feather-video"></i> {teacher.course_count} Khóa học
                  </Link>
                </li>
              </ul>
            </div>
            <div className="content">
              <p className="description">{teacher.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instructor;
