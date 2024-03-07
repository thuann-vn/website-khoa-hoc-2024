import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import BreadCrumb from '@/Components/Common/BreadCrumb'
import Checkout from '@/Components/Checkout/Checkout'

export default function CheckoutPage({
  course, courseSection, type
}: PageProps<{ course: any, courseSection:any, type: any }>) {
  return (
    <>
      <Head title={"Mua khóa học"} />
      <Guest>
        <BreadCrumb title="Đăng ký khóa học" text={course.name} />
        <div className="checkout_area bg-color-white rbt-section-gap">
          <Checkout course={course} courseSection={courseSection} type={type}/>
        </div>
      </Guest>
    </>
  )
}
