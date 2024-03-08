import { Head, Link, useForm } from '@inertiajs/react'
import { PageProps } from '@/types'
import Guest from '@/Layouts/GuestLayout'
import BreadCrumb from '@/Components/Common/BreadCrumb'
import Checkout from '@/Components/Checkout/Checkout'
import CheckoutForm from '@/Components/Checkout/CheckoutForm'
import { currency } from '@/helper'

export default function CheckoutPage({
  course, courseSection
}: PageProps<{ course: any, courseSection:any }>) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    course_id: course.id,
    course_section_id: null
  });
  const _submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    post(route('master-class-checkout-store', {slug: course.slug}),{
      data: data
    });
  }

  return (
    <>
      <Head title={"Mua khóa học thành công"} />
      <Guest>
        <BreadCrumb title="Đăng ký khóa học Master Class" text={course.name} />
        <div className="checkout_area bg-color-white rbt-section-gap">
          <div className="container">
            <div className="row g-5 checkout-form">
              <CheckoutForm formData={data} setFormData={setData} errors={errors} />

              <div className="col-lg-5">
                <div className="row pl--50 pl_md--0 pl_sm--0">
                  <div className="col-12 mb--60">
                    <div className="checkout-cart-total">
                      <ul>
                        <li>
                          {course.name}
                          <span>{currency(course.price)}</span>
                        </li>
                      </ul>
                      <h4 className="mt--30">
                        Thành
                        tiền <span>{currency(course.price)}</span>
                      </h4>
                    </div>
                  </div>

                  <div className="plceholder-button">
                    <button onClick={_submit} className="rbt-btn btn-gradient hover-icon-reverse">
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Đăng ký khóa học Master Class</span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                    </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Guest>
    </>
  )
}
