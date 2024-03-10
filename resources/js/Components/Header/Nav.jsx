
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
        <li className="">
          <Link
            className={`${activeMenuItem === "courses" ? "open" : ""}`}
            onClick={() => toggleMenuItem("courses")}
            href={route('courses')}
          >
            Khóa học
          </Link>
        </li>
        <li className="has-dropdown has-child-menu">
          <a
            className={`${activeMenuItem === "blog" ? "open" : ""}`}
            onClick={() => toggleMenuItem("blog")}
            href={'#'}
          >
            Kiến thức
          </a>
          <ul
            className={`submenu ${
              activeMenuItem === "blog" ? "active d-block" : ""
            }`}
          >
            {blog_categories.map((data, index) => {
              return (
                <li className="has-dropdown" key={index}>
                  <Link href={route('blog.category', {category: data.slug})}>{data.name}</Link>
                </li>
              )
            })}
          </ul>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
