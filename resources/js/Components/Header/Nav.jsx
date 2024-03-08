
import { useState } from "react";

import { Link } from '@inertiajs/react'

const Nav = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const toggleMenuItem = (item) => {
    setActiveMenuItem(activeMenuItem === item ? null : item);
  };

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
        <li className="">
          <Link
            className={`${activeMenuItem === "courses" ? "open" : ""}`}
            onClick={() => toggleMenuItem("courses")}
            href={route('courses')}
          >
            Khóa học
          </Link>
        </li>
        <li className="">
          <Link
            className={`${activeMenuItem === "blog" ? "open" : ""}`}
            onClick={() => toggleMenuItem("blog")}
            href={route('blog')}
          >
            Kiến thức
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
