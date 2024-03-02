
import useCategoryCount from "@/context/useCategoryCount";

import CourseDetails from "../../data/course-details/courseData.json";
import { Link } from '@inertiajs/react'
import { getImageStoragePath } from '@/helper'

const CategoryEight = ({categories}) => {
  console.log(categories)
  const { categoryCounts } = useCategoryCount(CourseDetails.courseDetails);

  return (
    <>
      {categories.map((item, innerIndex) => {
          const count = item.course_count || 0;

          return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={innerIndex}>
              <Link
                className="rbt-cat-box rbt-cat-box-1 image-overlaping-content on-hover-content-visible"
                href={`/course-filter-one-toggle/${item.category}`}
              >
                <div className="inner">
                  <div className="thumbnail">
                    <img
                      src={getImageStoragePath(item.image)}
                      width={300}
                      height={300}
                      alt="Icons Images"
                    />
                  </div>
                  <div className="content">
                    <h5 className="title">{item.name}</h5>
                    <div className="read-more-btn">
                      <span className="rbt-btn-link">
                        {count} Khóa học
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

export default CategoryEight;
