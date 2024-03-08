import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import BlogDetails from '@/Components/Blogs/BlogDetails'
import BlogBreadCrumb from '@/Components/Common/Blog-BreadCrumb'
import BlogListItems from '@/Components/Blogs/Blog-Sections/BlogList-Items'

export default function BlogIndex({ post, relatedPosts }: PageProps<{post: any,relatedPosts:any }>) {
  console.log(relatedPosts)
  return (
    <>
      <Head title={post.title} />
      <Guest>

        <div className="rbt-overlay-page-wrapper">
          <BlogBreadCrumb matchedBlog={post} />

          <div className="rbt-blog-details-area rbt-section-gapBottom breadcrumb-style-max-width">
            <div className="blog-content-wrapper rbt-article-content-wrapper">
              <BlogDetails
                matchedBlog={post}
              />
              {
                relatedPosts && relatedPosts.length ? (
                  <div className="related-post pt--60">
                    <div className="section-title text-start mb--40">
                    <span className="subtitle bg-primary-opacity">
                      Bài viết liên quan
                    </span>
                      <h4 className="title">Có thể bạn quan tâm</h4>
                    </div>
                    <BlogListItems
                      selectedBlogs={relatedPosts}
                      start={0}
                      end={4}
                    />
                  </div>
                ) : null
              }

            </div>
          </div>
        </div>

      </Guest>
    </>
  )
}
