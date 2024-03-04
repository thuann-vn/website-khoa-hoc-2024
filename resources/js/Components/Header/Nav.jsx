
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
            className={`${activeMenuItem === "home" ? "open" : ""}`}
            onClick={() => toggleMenuItem("home")}
            href="/"
          >
            Khóa học
          </Link>
        </li>
        <li className="">
          <Link
            className={`${activeMenuItem === "home" ? "open" : ""}`}
            onClick={() => toggleMenuItem("home")}
            href="/"
          >
            Kiến thức
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
