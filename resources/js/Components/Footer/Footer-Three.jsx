
import FooterData from "../../data/footer.json";
import SingleFooter from "./FooterProps/SingleFooter";
import CopyRight from "./CopyRight";
import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const FooterThree = () => {
  const {site_settings} = usePage().props
  const socialLink = [
    {
      icon: "feather-facebook",
      link: site_settings.facebook
    },
    {
      icon: "feather-zalo",
      link:  site_settings.zalo
    }
  ]
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
                            alt="Edu-cause"
                          />
                        </Link>
                      </div>

                      <p className="description mt--20">{site_settings.description}</p>

                      <div className="contact-btn mt--30">
                        <a
                          className="rbt-btn hover-icon-reverse btn-border-gradient radius-round"
                          href={"tel:" + site_settings.phone}
                          target={"_blank"}
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
                        </a>
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
                          <b>{site_settings.company_name}</b>
                        </li>
                        <li>
                          {site_settings.company_tax_text}
                        </li>
                        <li>
                          <span>Hotline:</span>{' '}
                          <a href={"tel:" + site_settings.phone} target={"_blank"}>{site_settings.phone}</a>
                        </li>
                        <li>
                          <span>E-mail:</span>{' '}
                          <a href={"mailto:" + site_settings.email} target={"_blank"}>
                            {site_settings.email}
                          </a>
                        </li>
                        <li>
                          <span>Địa chỉ:</span> {site_settings.address}
                        </li>
                      </ul>
                      <ul className="social-icon social-default icon-naked justify-content-start mt--20">
                        {socialLink.map((value, innerIndex) => (
                          <li key={innerIndex}>
                          <a href={value.link} target={"_blank"}>
                            {
                              value.icon === 'feather-zalo' ?
                                <img src={'/images/zalo.png'} width={36} height={36} /> :
                                <img src={'/images/facebook.png'} width={36} height={36} />
                            }
                          </a>
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
