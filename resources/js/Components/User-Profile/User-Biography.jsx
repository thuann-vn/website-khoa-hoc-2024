// import Image from "next/image";
import { Link } from '@inertiajs/react'

import React from "react";

const Biography = ({ checkMatchProfile }) => {
  return (
    <>
      <div className="col-lg-12 mt--30">
        <div className="profile-content rbt-shadow-box">
          <h4 className="rbt-title-style-3">Giới thiệu</h4>
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="mt--10 mb--20" dangerouslySetInnerHTML={{__html: checkMatchProfile.bio}}></div>
              <ul className="rbt-information-list mt--15">
                <li>
                  <a href={`tel:${checkMatchProfile.phone}`}>
                    <i className="feather-phone"></i>
                    {checkMatchProfile.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${checkMatchProfile.mail}`}>
                    <i className="feather-mail"></i>
                    {checkMatchProfile.mail}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Biography;
