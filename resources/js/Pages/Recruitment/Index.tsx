import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import Banner from '@/Components/Common/Banner'
import RecruitmentGrid from '@/Components/Recruitment/RecruitmentGrid'

export default function BlogIndex({ posts, category, featuredPosts }: PageProps<{
  category: any,
  posts: any,
  featuredPosts: any
}>) {
  console.log(posts)
  return (
    <>
      <Head title={category ? category.name : 'Kiến thức'} />
      <Guest>
        <Banner category={category} col="col-lg-12" text={'VIỆC LÀM KIM HOÀN - TRANG SỨC\n'}
                getBlog={posts}
                description={
                  'Tìm kiếm việc làm kim hoàn, trang sức tại các cửa hàng trang sức, xưởng sản xuất trang sức, công ty trang sức uy tín tại Việt Nam'
                }
        />
        <div className="rbt-blog-area rbt-section-overlayping-top rbt-section-gapBottom">
          <div className="container">
            <RecruitmentGrid posts={posts} featuredPosts={posts} isPagination={true} top={true} start={0} end={6} />
          </div>
        </div>
      </Guest>
    </>
  )
}
