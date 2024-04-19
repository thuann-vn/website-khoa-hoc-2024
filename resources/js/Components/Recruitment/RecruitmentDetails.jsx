// import Image from "next/image";
import { Link } from '@inertiajs/react'
import { formatDateTime, getImageStoragePath } from '@/helper'
const BlogDetails = ({ matchedBlog }) => {
  return (
    <>
      <div className="content">
        <div className="post-thumbnail mb--30 position-relative wp-block-image alignwide">
          <figure>
            {matchedBlog.image && (
              <img
                src={getImageStoragePath(matchedBlog.image)}
                width={1085}
                height={645}
                alt="Blog Images"
              />
            )}
          </figure>
        </div>
        <div className={"mb--40"}>
          <h3>Thông tin chung:</h3>
          <p>
            Chức vụ:  <b>{matchedBlog.position}</b><br />
            Mức lương: <b>{matchedBlog.salary}</b><br />
            Địa điểm làm việc: <b>{matchedBlog.location}</b>
            Hình thức làm việc: <b>{matchedBlog.type}</b><br />
            Số lượng cần tuyển: <b>{matchedBlog.total_positions} người. </b><br />
            Thời gian thử việc: <b>{matchedBlog.probation_period}. </b><br />
            Hạn nộp hồ sơ: <b>{formatDateTime(matchedBlog.expiry_date)}.</b> <br />
            Liên hệ tới: <b>{matchedBlog.contact}. </b><br />
          </p>
        </div>
        <div dangerouslySetInnerHTML={{__html: matchedBlog.content}}></div>
      </div>
    </>
  );
};

export default BlogDetails;
