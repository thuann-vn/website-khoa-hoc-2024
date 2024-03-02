import Link from "next/link";
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
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
            <Link href="#overview">Overview</Link>
          </li>
          <li className={currentSection === "#coursecontent" ? "current" : ""}>
            <Link href="#coursecontent">Course Content</Link>
          </li>
          <li className={currentSection === "#details" ? "current" : ""}>
            <Link href="#details">Details</Link>
          </li>
          <li className={currentSection === "#intructor" ? "current" : ""}>
            <Link href="#intructor">Instructor</Link>
          </li>
          <li className={currentSection === "#review" ? "current" : ""}>
            <Link href="#review">Review</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default CourseMenu;
