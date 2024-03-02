import Link from "next/link";

import ColorPalette from "./Sections/ColorPalette";
import Gradient from "./Sections/Gradient";
import Typography from "./Sections/Typography";
import FormElements from "./Sections/FormElements";
import Pagination from "./Sections/Pagination";
import Tooltips from "./Sections/Tooltips";
import Avatars from "./Sections/Avatars";
import AnimatedHeading from "./Sections/AnimatedHeading";
import BorderRadius from "./Sections/BorderRadius";

const StyleGuide = () => {
  return (
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-3">
          <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
            <div className="inner">
              <div className="content-item-content">
                <div className="rbt-widget-details">
                  <div className="onepagenav">
                    <ul className="mainmenu rbt-course-details-list-wrapper">
                      <li className="current">
                        <Link href="#colorPalette">
                          <span>1. Color Palette</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#gradient">
                          <span>2. Color Gradient</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#typography">
                          <span>3. Typography</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#formElements">
                          <span>4. Form Elements</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#pagination">
                          <span>5. Pagination</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#tooltips">
                          <span>6. Tooltips</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#avatars">
                          <span>7. Avatars</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#animatedHeading">
                          <span>8. Animated Heading</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#rbtBorderRadius">
                          <span>9. Border Radius</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <ColorPalette />
          <Gradient />
          <Typography />
          <FormElements />
          <Pagination />
          <Tooltips />
          <Avatars />
          <AnimatedHeading />
          <BorderRadius />
        </div>
      </div>
    </div>
  );
};

export default StyleGuide;
