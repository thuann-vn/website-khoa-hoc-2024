import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import CategoryHead from '@/Components/Category/CategoryHead'
import CourseFilterOneToggle from '@/Components/Category/Filter/CourseFilterOneToggle'
import { SetStateAction, useEffect, useState } from 'react'

import CourseDetails from '../../data/course-details/courseData.json'
import Pagination from '@/Components/Common/Pagination'

export default function CourseIndex({
                                      courses, category
                                    }: PageProps<{ category: any, courses: any[] }>) {
  const [course, setCourse] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  let getAllCourse = courses

  const startIndex = (page - 1) * 6

  const getSelectedCourse = courses.slice(startIndex, startIndex + 6)

  const handleClick = (num: SetStateAction<number>) => {
    setPage(num);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setTotalPages(Math.ceil(getAllCourse.length / 6));
  }, [setTotalPages, setCourse]);

  return (
    <>
      <Head title={category ? category.name : "Tất cả các khóa học"} />
      <Guest>
        <CategoryHead courses={courses} category={category} />
        <div className="rbt-section-overlayping-top rbt-section-gapBottom">
          <div className="inner">
            <div className="container">
              <CourseFilterOneToggle course={getSelectedCourse} start={0} end={1} />

              {getAllCourse.length > 6 ? (
                <div className="row">
                  <div className="col-lg-12 mt--60">
                    <Pagination
                      totalPages={totalPages}
                      pageNumber={page}
                      handleClick={handleClick}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

      </Guest>
    </>
  )
}
