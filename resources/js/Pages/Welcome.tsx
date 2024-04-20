import { Head, Link, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import CategoryEight from '@/Components/Category/CategoryEight'
import Card from '@/Components/Cards/Card'
import BlogGridMinimal from '@/Components/Blogs/BlogGridMinimal'
import Guest from '@/Layouts/GuestLayout'
import MasterClassCardSingle from '@/Components/Cards/MasterClassCardSingle'
import { getImageStoragePath } from '@/helper'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import OfflineCourseCardSingle from '@/Components/Cards/OfflineCourseCardSingle'
import RecruitmentSingleCard from '@/Components/Recruitment/RecruitmentSingleCard'

export default function Welcome({ categories, courses, masterCourses, offlineCourses, featuredPosts, recruitmentPosts }: PageProps<{ categories: any[], courses: any[], masterCourses: any[], offlineCourses: any[], featuredPosts: [], recruitmentPosts: [] }>) {
  const {site_settings, app_url} = usePage<PageProps>().props;
  const { height, width } = useWindowDimensions();
  return (
    <>
      <Head title="Home page" />
      <Guest>
        <div className={"rbt-banner-5 height-650 bg_image"}
        style={{
          backgroundImage: "url('" + getImageStoragePath(width && width <= 767 ?  site_settings.mobile_banner_image : site_settings.banner_image, app_url) + "')",
        }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="inner text-start">
                  <h2 className="title" dangerouslySetInnerHTML={{__html: site_settings.banner_title}}>
                  </h2>
                  <p className="description" dangerouslySetInnerHTML={{__html: site_settings.banner_description}}>
                  </p>
                  <div className="slider-btn rbt-button-group justify-content-start">
                    <Link
                      className="rbt-btn btn-border icon-hover color-white radius-round"
                      href={route('courses')}
                    >
                      <span className="btn-text">Khám phá các khóa học</span>
                      <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                    </Link>
                    <Link className="rbt-btn-link color-white" href={route('dashboard')}>
                      Bắt đầu học<i className="feather-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rbt-category-area bg-color-white rbt-section-gapTop">
          <div className="container">
            <div className="row g-5">
              <CategoryEight categories={categories} />
            </div>
          </div>
        </div>

        {
          masterCourses.length > 0 && (
            <div className="rbt-featured-course bg-color-white rbt-section-gap">
              <div className="container">
                <div className="row g-5 align-items-end mb--60">
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="section-title text-start">
                      <h2 className="title">Master Class</h2>
                      <p className="description mt--20">
                        Các combo khóa học nổi bật về thiết kế trang sức.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row g-5">
                  {masterCourses.map((data, index) => (
                    <div
                      className={`col-lg-4 col-md-6 col-sm-12 col-12`}
                      data-sal-delay="150"
                      data-sal="slide-up"
                      data-sal-duration="800"
                      key={index}
                    >
                      <MasterClassCardSingle data={data} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        <div className="rbt-featured-course bg-color-white rbt-section-gap">
          <div className="container">
            <div className="row g-5 align-items-end mb--60">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="section-title text-start">
                  <h2 className="title">Danh sách khóa học</h2>
                  <p className="description mt--20">
                    Các khóa học nổi bật về thiết kế trang sức.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="load-more-btn text-start text-lg-end">
                  <Link
                    className="rbt-btn btn-border icon-hover radius-round"
                    href={route('courses')}
                  >
                    <span className="btn-text">Xem tất cả các khóa học</span>
                    <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="row g-5">
              <Card
                col="col-lg-4 col-md-6 col-sm-12 col-12"
                mt=""
                isDesc={true}
                isUser={true}
                courses={courses}
              />
            </div>
          </div>
        </div>


        {
          offlineCourses.length > 0 && (
            <div className="rbt-featured-course bg-color-white rbt-section-gap">
              <div className="container">
                <div className="row g-5 align-items-end mb--60">
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="section-title text-start">
                      <h2 className="title">Khóa học offline</h2>
                      <p className="description mt--20">
                        Các khóa học offline nổi bật về thiết kế trang sức.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row g-5">
                  {offlineCourses.map((data, index) => (
                    <div
                      className={`col-lg-4 col-md-6 col-sm-12 col-12`}
                      data-sal-delay="150"
                      data-sal="slide-up"
                      data-sal-duration="800"
                      key={index}
                    >
                      <OfflineCourseCardSingle data={data} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        {
          recruitmentPosts.length > 0 && (
            <div className="rbt-featured-course bg-color-white rbt-section-gap">
              <div className="container">
                <div className="row g-5 align-items-end mb--60">
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="section-title text-start">
                      <h2 className="title">VIỆC LÀM KIM HOÀN - TRANG SỨC</h2>
                      <p className="description mt--20">
                        Danh sách các việc làm mới nhất trong ngành kim hoàn - trang sức.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row g-5">
                  {recruitmentPosts.map((data, index) => (
                    <RecruitmentSingleCard data={data} key={index} />
                  ))}
                </div>
              </div>
            </div>
          )
        }

        <div className="rbt-rbt-blog-area rbt-section-gapTop bg-gradient-8 rbt-round-bottom-shape">
          <div className="wrapper pb--50 rbt-index-upper">
            <div className="container">
              <div className="row g-5 align-items-end mb--60">
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="section-title text-start">
                    <h2 className="title color-white">Kiến Thức</h2>
                    <p className="description color-white-off mt--20">
                      Tổng hợp kiến thức về thiết kế trang sức và chiari sẻ kinh nghiệm từ các chuyên gia.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="load-more-btn text-start text-lg-end">
                    <Link
                      className="rbt-btn btn-border icon-hover radius-round color-white-off"
                      href={route('blog')}
                    >
                      <span className="btn-text">Xem tất cả bài viết</span>
                      <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                    </Link>
                  </div>
                </div>
              </div>
              <BlogGridMinimal data={featuredPosts} start={0} end={3} isPagination={false} />
            </div>
          </div>
        </div>
      </Guest>
    </>
  )
}
