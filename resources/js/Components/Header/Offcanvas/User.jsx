
import UserData from "../../../data/user.json";
import { Link } from '@inertiajs/react'

const User = ({user}) => {
  return (
    <div className="rbt-user-menu-list-wrapper">
      <div className="inner">
        <div className="rbt-admin-profile">
          <div className="admin-thumbnail">
            <img
              src={'/images/team/avatar.jpg'}
              width={43}
              height={43}
              alt="User Images"
            />
          </div>
          <div className="admin-info">
            <span className="name">{user.name}</span>
            <Link
              className="rbt-btn-link color-primary"
              href={route("dashboard")}
            >
              Xem hồ sơ
            </Link>
          </div>
        </div>

        <ul className="user-list-wrapper">
          <li>
            <Link href={route('enrolled-course')}>
              <i className="feather-book-open"></i>
              <span>Khóa học của tôi</span>
            </Link>
          </li>
        </ul>
        <hr className="mt--10 mb--10" />
        <ul className="user-list-wrapper">
          <li>
            <Link href={route('logout')}>
              <i className="feather-log-out"></i>
              <span>Đăng xuất</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User;
