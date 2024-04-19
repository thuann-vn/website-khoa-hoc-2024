import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import Banner from '@/Components/Common/Banner'
import BlogGrid from '@/Components/Blogs/BlogGrid'

export default function BlogIndex({ posts, category, featuredPosts }: PageProps<{category :any, posts: any,featuredPosts:any }>) {
  console.log(posts)
  return (
    <>
      <Head title={category ? category.name :'Kiến thức'} />
      <Guest>
        <Banner category={category} col="col-lg-12" text={category ? category.name :'Kiến thức'} getBlog={posts} />
        <div className="rbt-blog-area rbt-section-overlayping-top rbt-section-gapBottom">
          <div className="container">
            <BlogGrid posts={posts} featuredPosts={posts} isPagination={true} top={true} start={0} end={6} />
          </div>
        </div>
      </Guest>
    </>
  )
}
