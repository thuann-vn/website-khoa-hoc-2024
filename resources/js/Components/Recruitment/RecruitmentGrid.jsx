// import Image from "next/image";
import { Link, router } from '@inertiajs/react'

import { useEffect, useState } from "react";

import Pagination from "../Common/Pagination";
import { getImageStoragePath } from '../../helper'
import RecruitmentSingleCard from '@/Components/Recruitment/RecruitmentSingleCard.jsx'

const RecruitmentGrid = ({ isPagination, top, start, end, posts, featuredPosts }) => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const startIndex = (page - 1) * 10;
  const selectedGridBlogs = blogs.slice(startIndex, startIndex + 10);

  const handleClick = (num) => {
    setPage(num);
    location.href = route('blog', {page:num})
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setBlogs(posts.data);
    setTotalPages(posts.last_page);
  }, [setTotalPages, setBlogs]);
  return (
    <>
      <div className="row g-5 mt--15">
        {selectedGridBlogs.map((data, index) => (
            <RecruitmentSingleCard key={index} data={data} />
          ))}
      </div>

      {isPagination && selectedGridBlogs.length ? (
        <div className="row">
          <div className="col-lg-12 mt--60">
            <Pagination
              totalPages={totalPages}
              pageNumber={posts.current_page}
              handleClick={handleClick}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default RecruitmentGrid;
