import { Link } from '@inertiajs/react'

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
                    src={matchedBlog.authorImg}
                    width={494}
                    height={494}
                    alt="blog-image"
                  />
                )}
              </div>
              {matchedBlog && (
                <div className="author-info">
                  <Link href="#">
                    <strong>{matchedBlog.name}</strong>
                  </Link>{" "}
                  in{" "}
                  <Link href="#">
                    <strong>{matchedBlog.position}</strong>
                  </Link>
                </div>
              )}
            </li>
            {matchedBlog && (
              <li className="list-item">
                <i className="feather-clock"></i>
                <span>{matchedBlog.date}</span>
              </li>
            )}
          </ul>
          {matchedBlog && <h1 className="title">{matchedBlog.title}</h1>}
          {matchedBlog && <p>{matchedBlog.desc}</p>}
        </div>
      </div>
    </>
  );
};

export default BlogBreadCrumb;
