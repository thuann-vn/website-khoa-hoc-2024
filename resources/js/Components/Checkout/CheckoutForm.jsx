import React from "react";

const InputError = ({ message }) => {
  if(message){
   return  <p className={"text-danger input-error"}>{message}</p>
  }
  return null
}
const CheckoutForm = ({formData, setFormData, errors}) => {
  return (
    <>
      <div className="col-lg-7">
        <div className="checkout-content-wrapper">
          <div id="billing-form">
            <h4 className="checkout-title">Thông tin học viên</h4>

            <div className="row">
              <div className="col-md-12 col-12 mb--20">
                <label>Họ và tên*</label>
                <input type="text" value={formData.name} onChange={(event) => {
                  setFormData({ ...formData, name: event.target.value })
                }} placeholder="Họ và tên" />
                <InputError message={errors.name}/>
              </div>
              <div className="col-md-12 col-12 mb--20">
                <label>Email*</label>
                <input type="email" placeholder="Địa chỉ email của bạn" value={formData.email} onChange={(event) => {
                  setFormData({ ...formData, email: event.target.value })
                }} />
                <InputError message={errors.email}/>
              </div>

              <div className="col-md-12 col-12 mb--20">
                <label>Số điện thoại*</label>
                <input type="text" placeholder="Số điện thoại" value={formData.phone} onChange={(event) => {
                  setFormData({ ...formData, phone: event.target.value })
                }} />
                <InputError message={errors.phone}/>
              </div>


              <div className="col-md-12 col-12 mb--20">
                <label>Mã voucher</label>
                <input type="text" placeholder="" value={formData.voucher_code} onChange={(event) => {
                  setFormData({ ...formData, voucher_code: event.target.value })
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
