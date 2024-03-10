import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import CategoryEight from '@/Components/Category/CategoryEight'
import Card from '@/Components/Cards/Card'
import CounterFive from '@/Components/Counters/Counter-Five'
import TestimonialFive from '@/Components/Testimonials/TestimonialFive'
import BlogGridMinimal from '@/Components/Blogs/BlogGridMinimal'
import Guest from '@/Layouts/GuestLayout'
import CardSingle from '@/Components/Cards/CardSingle'
import MasterClassCardSingle from '@/Components/Cards/MasterClassCardSingle'
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
