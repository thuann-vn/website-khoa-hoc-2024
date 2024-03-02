import Image from "next/image";

import img from "../../public/images/tab/tabs-10.jpg";

const InstructorRegistration = () => {
  return (
    <>
      <div className="row pt--60 g-5">
        <div className="col-lg-4">
          <div className="thumbnail">
            <img
              className="radius-10 w-100"
              src={img}
              alt="Corporate Template"
            />
          </div>
        </div>

        <div className="col-lg-8">
          <div className="rbt-contact-form contact-form-style-1 max-width-auto">
            <div className="section-title text-start">
              <span className="subtitle bg-primary-opacity">
                For Become a Instructor
              </span>
            </div>
            <h3 className="title">Instructor Registration</h3>
            <hr className="mb--30" />

            <form action="#" className="row row--15">
              <div className="col-lg-6">
                <div className="form-group">
                  <input name="con_name" type="text" />
                  <label>First Name</label>
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <input name="con_lastname" type="text" />
                  <label>Last Name</label>
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <input name="con_username" type="text" />
                  <label>User name</label>
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <input name="con_phone" type="text" />
                  <label>Phone Number</label>
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group">
                  <input name="con_email" type="email" />
                  <label>Email</label>
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <input name="con_password" type="password" />
                  <label>Password</label>
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <input name="con_passwordconfirm" type="password" />
                  <label>Password Confirmation</label>
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group">
                  <textarea></textarea>
                  <label>Bio</label>
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-submit-group">
                  <button
                    type="submit"
                    className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Become a Instructor</span>
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorRegistration;
