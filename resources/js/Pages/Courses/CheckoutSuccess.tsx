import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import BreadCrumb from '@/Components/Common/BreadCrumb'
import { currency } from '@/helper'

export default function CheckoutPage({
  order,
                                      course, courseSection
                                    }: PageProps<{ course: any, courseSection:any, order: any }>) {
  return (
    <>
      <Head title={"Mua khóa học"} />
      <Guest>
        <BreadCrumb title="Đăng ký khóa học thành công" text={course.name} />
        <div className="checkout_area bg-color-white rbt-section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p>
                  Cảm ơn bạn đã đăng ký khóa học <b>{course.name}</b> của chúng tôi. <br/>
                  Vui lòng thanh toán để hoàn tất quá trình đăng ký: <br/>
                  - Số tiền cần thanh toán: <b>{currency(order.total_price)}</b> <br/>
                  - Số tài khoản: <b>123456789</b> <br/>
                  - Chủ tài khoản: <b>Nguyễn Văn A</b> <br/>
                  - Ngân hàng: <b>Ngân hàng ABC</b> <br/>
                  - Nội dung chuyển khoản: <b>Thanh toan don hang {order.id}</b> <br/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Guest>
    </>
  )
}
