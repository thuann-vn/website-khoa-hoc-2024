import { Link } from '@inertiajs/react'
import { useState, useEffect } from "react";

const CourseMenu = () => {
  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    const sections = [
      "#overview",
      "#coursecontent",
      "#details",
      "#intructor",
      "#review",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        var isIntersecting = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isIntersecting) {
            setCurrentSection(`#${entry.target.id}`);
            isIntersecting = true;
          }
        });
      },
      { threshold: 1.0 }
    );

    sections.forEach((section) => {
      const element = document.querySelector(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.querySelector(section);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <>
      <nav className="mainmenu-nav onepagenav">
        <ul className="mainmenu">
          <li className={currentSection === "#overview" ? "current" : ""}>
            <a href="#overview">Giới thiệu</a>
          </li>
          <li className={currentSection === "#coursecontent" ? "current" : ""}>
            <a href="#coursecontent">Nội dung khóa học</a>
          </li>
          <li className={currentSection === "#intructor" ? "current" : ""}>
            <a href="#intructor">Giáo viên</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default CourseMenu;
