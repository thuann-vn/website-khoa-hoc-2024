import HeaderTopMidThree from "./Header-Top/HeaderTopMid-Three";
import HeaderSeven from "./Headers/Header-Seven";

const HeaderStyleNine = () => {
  return (
    <>
      <header className="rbt-header rbt-header-9">
        <div className="rbt-sticky-placeholder"></div>

        <HeaderSeven
          transparent="header-not-transparent header-sticky"
          gapSpaceBetween=""
          navigationEnd="rbt-navigation-end"
          btnClass="rbt-switch-btn btn-gradient btn-sm hover-transform-none"
          btnText="Đăng nhập"
        />
      </header>
    </>
  );
};

export default HeaderStyleNine;
