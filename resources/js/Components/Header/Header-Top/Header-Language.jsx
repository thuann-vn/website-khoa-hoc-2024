

import { Link } from '@inertiajs/react'

const HeaderLanguage = () => {
  return (
    <>
      <div className="header-info">
        <ul className="rbt-dropdown-menu switcher-language">
          <li className="has-child-menu">

          </li>
        </ul>
      </div>

      <div className="header-info">
        <ul className="rbt-dropdown-menu currency-menu">
          <li className="has-child-menu">
            <Link href="#">
              <span className="menu-item">USD</span>
              <i className="right-icon feather-chevron-down"></i>
            </Link>
            <ul className="sub-menu hover-reverse">
              <li>
                <Link href="#">
                  <span className="menu-item">EUR</span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="menu-item">GBP</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderLanguage;
