// import Image from "next/image";
import { Link } from '@inertiajs/react'
const BlogDetails = ({ matchedBlog }) => {
  return (
    <>
      <div className="content">
        <div className="post-thumbnail mb--30 position-relative wp-block-image alignwide">
          <figure>
            {matchedBlog.media && (
              <img
                src={matchedBlog.media?.url}
                width={1085}
                height={645}
                alt="Blog Images"
              />
            )}
            <figcaption>{matchedBlog.description}</figcaption>
          </figure>
        </div>
        <div dangerouslySetInnerHTML={{__html: matchedBlog.content}}></div>
      </div>
    </>
  );
};

export default BlogDetails;
