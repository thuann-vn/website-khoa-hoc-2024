import { Link } from '@inertiajs/react'

const CategoryBanner = ({ category, courses }) => {
  return (
    <>
      <div className="rbt-banner-content-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="page-list">
                <li className="rbt-breadcrumb-item">
                  <Link href="/">Trang chủ</Link>
                </li>
                <li>
                  <div className="icon-right">
                    <i className="feather-chevron-right"></i>
                  </div>
                </li>
                <li className="rbt-breadcrumb-item active">
                  {category
                    ? category.name
                    : "Tất cả khóa học"}
                </li>
              </ul>
              <div className=" title-wrapper">
                <h1 className="title mb--0">
                  {" "}
                  {category
                    ? category.name
                    : "Tất cả khóa học"}
                </h1>
                <Link href="#" className="rbt-badge-2">
                  <div className="image">🎉</div>
                  {courses?.length} Khóa học
                </Link>
              </div>
              <p className="description">
                {category && category.description
                  ? category.description
                  : "Danh sách tất cả khóa học của chúng tôi"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryBanner;
