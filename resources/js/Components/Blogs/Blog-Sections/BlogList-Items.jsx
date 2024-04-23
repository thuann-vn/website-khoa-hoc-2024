import { Link } from '@inertiajs/react'
import { getImageStoragePath } from '@/helper'
// import Image from "next/image";

const BlogListItems = ({ start, end, selectedBlogs, isRecruitment = false }) => {
  return (
    <>
      {selectedBlogs &&
        selectedBlogs.slice(start, end).map((item, index) => (
          <div
            className="rbt-card card-list variation-02 rbt-hover mt--30"
            style={{minHeight: '240px'}}
            key={index}
          >
            <div className="rbt-card-img">
              <Link href={route(isRecruitment ? 'recruitment.detail' :'blog.detail' , {slug: item.slug})}>
                <img
                  src={item.image ? getImageStoragePath(item.image)  : (item.media?.url || '/images/blog/blog-single-03.png') }
                  width={580}
                  height={300}
                  alt="Card image"
                />{" "}
              </Link>
            </div>
            <div className="rbt-card-body">
              <h5 className="rbt-card-title">
                <Link href={route(isRecruitment ? 'recruitment.detail' :'blog.detail', {slug: item.slug})}>{item.title}</Link>
              </h5>
              <div className="rbt-card-bottom">
                <Link className="transparent-button" href={route(isRecruitment ? 'recruitment.detail' :'blog.detail', {slug: item.slug})}>
                  Đọc thêm
                  <i>
                    <svg
                      width="17"
                      height="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g stroke="#27374D" fill="none" fillRule="evenodd">
                        <path d="M10.614 0l5.629 5.629-5.63 5.629" />
                        <path strokeLinecap="square" d="M.663 5.572h14.594" />
                      </g>
                    </svg>
                  </i>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default BlogListItems;
