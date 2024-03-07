import { Head, Link, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import BreadCrumb from '@/Components/Common/BreadCrumb'
import { currency } from '@/helper'

export default function CheckoutPage({
  order,
                                      course, courseSection
                                    }: PageProps<{ course: any, courseSection:any, order: any }>) {
  const { generalSettings = {}}  = usePage<any>().props
  const { bankNumber = "123456789", bankName = "Ngân hàng ABC", bankOwner = "Nguy ễn Văn A"} = generalSettings
  return (
    <>
      <Head title={"Mua khóa học"} />
      <Guest>
        <BreadCrumb title="Đăng ký khóa học thành công" text={course.name} />
        <div className="checkout_area bg-color-white rbt-section-gap">
          <div className="container">
            <div className="row align-items-center">
              <div className={"col-lg-3"}>
                <img src={`https://vietqr.co/api/generate/vcb/${bankNumber}/${bankName}/${order.total_price}/Thanh toan don hang ${order.id}?isMask=0&logo=1&style=1&bg=39`}  alt={"QR Code"}/>
              </div>
              <div className="col-lg-9">
                <p className={"p-5"}>
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
