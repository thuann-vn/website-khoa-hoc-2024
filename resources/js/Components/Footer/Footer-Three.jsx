
import FooterData from "../../data/footer.json";
import SingleFooter from "./FooterProps/SingleFooter";
import CopyRight from "./CopyRight";
import { Link } from '@inertiajs/react'

const FooterThree = () => {
  return (
    <>
      <footer className="rbt-footer footer-style-1">
        <div className="footer-top">
          <div className="container">
            {FooterData &&
              FooterData.footerOne.map((footer, index) => (
                <div className="row row--15 mt_dec--30" key={index}>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt--30">
                    <div className="footer-widget">
                      <div className="logo">
                        <Link href="/">
                          <img
                            src={"/images/logo.PNG"}
                            width={152}
                            height={50}
                            priority={true}
                            alt="Edu-cause"
                          />
                        </Link>
                      </div>

                      <p className="description mt--20">{footer.description}</p>

                      <div className="contact-btn mt--30">
                        <Link
                          className="rbt-btn hover-icon-reverse btn-border-gradient radius-round"
                          href="#"
                        >
                          <div className="icon-reverse-wrapper">
                            <span className="btn-text">Liên hệ chúng tôi</span>
                            <span className="btn-icon">
                              <i className="feather-arrow-right"></i>
                            </span>
                            <span className="btn-icon">
                              <i className="feather-arrow-right"></i>
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <SingleFooter
                    classOne="offset-lg-1 col-lg-4 col-md-6 col-sm-6 col-12 mt--30"
                    title="Đường dẫn"
                    footerType={footer.usefulLinks}
                  />
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt--30">
                    <div className="footer-widget">
                      <h5 className="ft-title">Liên hệ</h5>
                      <ul className="ft-link">
                        <li>
                          <span>Phone:</span>{" "}
                          <Link href="#">{footer.phone}</Link>
                        </li>
                        <li>
                          <span>E-mail:</span>{" "}
                          <Link href="mailto:hr@example.com">
                            {footer.mail}
                          </Link>
                        </li>
                        <li>
                          <span>Địa chỉ:</span> {footer.address}
                        </li>
                      </ul>
                      <ul className="social-icon social-default icon-naked justify-content-start mt--20">
                        {footer.socialLink.map((value, innerIndex) => (
                          <li key={innerIndex}>
                            <Link href={value.link}>
                              <i className={value.icon}></i>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </footer>
      <CopyRight />
    </>
  );
};

export default FooterThree;
