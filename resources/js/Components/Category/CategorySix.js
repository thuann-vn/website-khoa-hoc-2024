import { Link } from '@inertiajs/react'
// import Image from "next/image";

import CourseDetails from "../../data/course-details/courseData.json";
import useCategoryCount from "@/context/useCategoryCount";

const CategorySix = () => {
  const { categoryCounts } = useCategoryCount(CourseDetails.courseDetails);
  return (
    <>
      {CourseDetails &&
        CourseDetails.courseDetails.slice(0, 8).map((item, innerIndex) => {
          const count = categoryCounts[item.category] || 0;
          return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={innerIndex}>
              <Link
                className="rbt-cat-box rbt-cat-box-1 list-style"
                href={`/course-filter-one-toggle/${item.category}`}
              >
                <div className="inner">
                  <div className="thumbnail">
                    <img
                      src={item.cateBigImg}
                      width={300}
                      height={300}
                      priority
                      alt="Icons Images"
                    />
                  </div>
                  <div className="content">
                    <h5 className="title">{item.category}</h5>
                    <div className="read-more-btn">
                      <span className="rbt-btn-link">
                        {count} Course{count !== 1 ? "s" : ""}
                        <i className="feather-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default CategorySix;
