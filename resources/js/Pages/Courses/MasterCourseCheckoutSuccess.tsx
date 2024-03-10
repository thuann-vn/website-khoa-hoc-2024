import { Head, Link, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import BreadCrumb from '@/Components/Common/BreadCrumb'
import { currency } from '@/helper'

export default function CheckoutPage({
  order,
  course
}: PageProps<{ course: any, order: any }>) {
  const { site_settings = {}, banks}  = usePage<any>().props
  return (
    <>
      <Head title={"Mua khóa học thành công"} />
      <Guest>
        <BreadCrumb title="Đăng ký khóa học thành công" text={course.name} />
        <div className="checkout_area bg-color-white rbt-section-gap">
          <div className="container">
            <div className="row align-items-center">
              <div className={'col-lg-4'}>
                <img
                  src={`https://vietqr.co/api/generate/${site_settings.bank_name}/${site_settings.bank_number}/${site_settings.bank_account}/${parseInt(order.total_price)}/Thanh toan don hang ${order.id}?isMask=0&logo=1&style=1&bg=39`}
                  alt={'QR Code'} />
              </div>
              <div className="col-lg-8">
                <p className={'p-5'} style={{"lineHeight": "32px"}}>
                  Cảm ơn bạn đã đăng ký khóa học <b>{course.name}</b> của chúng tôi. <br />
                  Vui lòng thanh toán để hoàn tất quá trình đăng ký: <br />
                  <br />
                  - Số tiền cần thanh toán: <b>{currency(order.total_price)}</b> <br />
                  - Số tài khoản: <b>{site_settings.bank_number}</b> <br />
                  - Chủ tài khoản: <b>{site_settings.bank_account}</b> <br />
                  - Ngân hàng: <b>{banks[site_settings.bank_name]}</b> <br />
                  - Nội dung chuyển khoản: <b>Thanh toan don hang {order.id}</b> <br />
                  <br />
                  Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua: <br />
                  Email: <b>{site_settings.email}</b> <br />
                  Hotline: <b>{site_settings.phone}</b><br />
                  Facebook: <b>{site_settings.facebook}</b><br />
                  Zalo: <b>{site_settings.zalo}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Guest>
    </>
  )
}
