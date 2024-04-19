
import { useState } from "react";

import { Link, usePage } from '@inertiajs/react'

const Nav = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const toggleMenuItem = (item) => {
    setActiveMenuItem(activeMenuItem === item ? null : item);
  };

  const { blog_categories } = usePage().props

  return (
    <nav className="mainmenu-nav">
      <ul className="mainmenu">
        <li className="">
          <Link
            className={`${activeMenuItem === "home" ? "open" : ""}`}
            onClick={() => toggleMenuItem("home")}
            href="/"
          >
            Trang chủ
          </Link>
        </li>
        <li className="has-dropdown has-child-menu">
          <Link
            className={`${activeMenuItem === 'courses' ? 'open' : ''}`}
            onClick={() => toggleMenuItem('courses')}
            href={route('courses')}
          >
            Khóa học
          </Link>
          <ul
            className={`submenu ${
              activeMenuItem === 'courses' ? 'active d-block' : ''
            }`}
          >
            <li className="has-dropdown">
              <Link href={route('courses')}>Khoá học Online</Link>
            </li>
            <li className="has-dropdown">
              <Link href={route('offline-courses')}>Khoá học Offline</Link>
            </li>
          </ul>
        </li>
        <li className="">
          <Link
            href={route('blog')}
          >
            Kiến thức
          </Link>
        </li>
        <li className="">
          <Link
            href={route('recruitment')}
          >
            Việc làm
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
