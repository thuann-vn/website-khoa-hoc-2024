// import Image from "next/image";
import { Link, router } from '@inertiajs/react'

import { useEffect, useState } from "react";

import BlogData from "../../data/blog/blog.json";
import BlogGridTop from "./Blog-Sections/BlogGrid-Top";
import Pagination from "../Common/Pagination";

const BlogGrid = ({ isPagination, top, start, end, posts, featuredPosts }) => {
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
      {featuredPosts.length ? (
        <BlogGridTop
          BlogData={featuredPosts}
          selectedGridBlogs={selectedGridBlogs}
        />
      ) : (
        ""
      )}

      <div className="row g-5 mt--15">
        {selectedGridBlogs.map((data, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={index}>
              <div className="rbt-card variation-02 rbt-hover">
                <div className="rbt-card-img">
                  <Link href={route('blog.detail', {slug: data.slug})}>
                    <img
                      src={data.image?.url || '/images/blog/blog-single-03.png'}
                      width={450}
                      height={267}
                      alt="Card image"
                    />{" "}
                  </Link>
                </div>
                <div className="rbt-card-body">
                  <h5 className="rbt-card-title">
                    <Link href={route('blog.detail', {slug: data.slug})}>{data.title}</Link>
                  </h5>
                  <p className="rbt-card-text">{data?.desc}</p>
                  <div className="rbt-card-bottom">
                    <Link
                      className="transparent-button"
                      href={route('blog.detail', {slug: data.slug})}
                    >
                      Đọc thêm
                      <i>
                        {" "}
                        <svg
                          width="17"
                          height="12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g stroke="#27374D" fill="none" fillRule="evenodd">
                            <path d="M10.614 0l5.629 5.629-5.63 5.629" />
                            <path
                              strokeLinecap="square"
                              d="M.663 5.572h14.594"
                            />
                          </g>
                        </svg>
                      </i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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

export default BlogGrid;
