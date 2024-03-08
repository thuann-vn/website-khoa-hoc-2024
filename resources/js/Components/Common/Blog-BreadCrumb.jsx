import { Link } from '@inertiajs/react'
import { formatDateTime } from '@/helper'

const BlogBreadCrumb = ({ matchedBlog }) => {
  return (
    <>
      <div className="breadcrumb-image-container breadcrumb-style-max-width">
        <div className="breadcrumb-image-wrapper">
          <img src={"/images/bg/bg-image-10.jpg"} alt="Education Images" />
        </div>
        <div className="breadcrumb-content-top text-center">
          <ul className="meta-list justify-content-center mb--10">
            <li className="list-item">
              <div className="author-thumbnail">
                {matchedBlog && (
                  <img
                    src={matchedBlog.media?.url}
                    width={494}
                    height={494}
                    style={{objectFit: "cover"}}
                  />
                )}
              </div>
            </li>
            {matchedBlog && (
              <li className="list-item">
                <i className="feather-clock"></i>
                <span>{formatDateTime(matchedBlog.published_at)}</span>
              </li>
            )}
          </ul>
          {matchedBlog && <h1 className="title">{matchedBlog.title}</h1>}
        </div>
      </div>
    </>
  );
};

export default BlogBreadCrumb;
