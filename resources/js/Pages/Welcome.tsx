import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import CategoryEight from '@/Components/Category/CategoryEight'
import Card from '@/Components/Cards/Card'
import CounterFive from '@/Components/Counters/Counter-Five'
import TestimonialFive from '@/Components/Testimonials/TestimonialFive'
import BlogGridMinimal from '@/Components/Blogs/BlogGridMinimal'
import Guest from '@/Layouts/GuestLayout'

export default function Welcome({ categories, courses }: PageProps<{ categories: any[], courses: any[] }>) {
  return (
    <>
      <Head title="Home page" />
      <Guest>
        <div className="rbt-banner-5 height-650 bg_image bg_image--19">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="inner text-start">
                  <h2 className="title">
                    <span className="text-decoration-underline">Histudy</span>{' '}
                    Starter is a community for creative people
                  </h2>
                  <p className="description">
                    We just don&apos;t give our student only lecture but real life
                    experience.
                  </p>
                  <div className="slider-btn rbt-button-group justify-content-start">
                    <Link
                      className="rbt-btn btn-border icon-hover color-white radius-round"
                      href="#"
                    >
                      <span className="btn-text">Explore Courses</span>
                      <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                    </Link>
                    <Link className="rbt-btn-link color-white" href="#">
                      Start learning<i className="feather-arrow-right"></i>
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
                    href={route("courses")}
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

        <div
          className="rbt-counterup-area bg_image bg_image_fixed bg_image--20 ptb--170 bg-black-overlay"
          data-black-overlay="2"
        >
          <CounterFive />
        </div>

        <div className="rbt-testimonial-area bg-color-extra2 rbt-section-gap">
          <div className="container">
            <div className="testimonial-item-3-activation swiper rbt-arrow-between gutter-swiper-30">
              <TestimonialFive isDesc={true} />
            </div>
          </div>
        </div>

        <div className="rbt-rbt-blog-area rbt-section-gapTop bg-gradient-8 rbt-round-bottom-shape">
          <div className="wrapper pb--50 rbt-index-upper">
            <div className="container">
              <div className="row g-5 align-items-end mb--60">
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="section-title text-start">
                    <h2 className="title color-white">Kiến Thức</h2>
                    <p className="description color-white-off mt--20">
                      Learning communicate to global world and build Link bright
                      future and career development, increase your skill with our
                      histudy.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="load-more-btn text-start text-lg-end">
                    <Link
                      className="rbt-btn btn-border icon-hover radius-round color-white-off"
                      href="/blog-list"
                    >
                      <span className="btn-text">Xem tất cả bài viết</span>
                      <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                    </Link>
                  </div>
                </div>
              </div>
              <BlogGridMinimal start={0} end={3} isPagination={false} />
            </div>
          </div>
        </div>
      </Guest>
    </>
  )
}