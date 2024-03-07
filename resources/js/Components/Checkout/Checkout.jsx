import { useSelector } from "react-redux";

import CheckoutForm from "./CheckoutForm";
import { currency } from '@/helper'
import { useForm } from '@inertiajs/react'

const Checkout = ({course, courseSection, type}) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    course_id: course.id,
    course_section_id: courseSection?.id,
    type: type
  });
  const _submit = (e) => {
    e.preventDefault();
    post(route('courses-checkout-store', {slug: course.slug}),{
      data: data
    });
  }

  return (
    <>
      <div className="container">
        <div className="row g-5 checkout-form">
          <CheckoutForm formData={data} setFormData={setData} errors={errors}/>

          <div className="col-lg-5">
            <div className="row pl--50 pl_md--0 pl_sm--0">
              <div className="col-12 mb--60">
                <div className="checkout-cart-total">
                  <ul>
                    <li>
                      {courseSection ? `${courseSection.name} - ` : ''} {course.name} {type === 'one-on-one' ? '(1-1 với giáo viên)' : ''}
                      <span>{currency(type === 'one-on-one' ? course.one_on_one_price : course.price)}</span>
                    </li>
                  </ul>
                  <h4 className="mt--30">
                    Thành tiền <span>{currency(type === 'one-on-one' ? course.one_on_one_price : course.price)}</span>
                  </h4>
                </div>
              </div>

              <div className="plceholder-button">
                <button onClick={_submit} className="rbt-btn btn-gradient hover-icon-reverse">
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Đăng ký khóa học</span>
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
    </>
  );
};

export default Checkout
