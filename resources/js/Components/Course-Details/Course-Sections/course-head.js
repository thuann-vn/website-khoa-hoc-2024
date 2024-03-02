import Image from "next/image";

import CourseBreadcrumb from "./Course-Breadcrumb";

import bgImage from "../../../public/images/bg/bg-image-10.jpg";

const CourseHead = ({ checkMatch }) => {
  return (
    <>
      <div className="breadcrumb-inner">
        <img src={bgImage} alt="Education Images" />
      </div>
      <div className="container">
        <div className="row">
          <CourseBreadcrumb getMatchCourse={checkMatch && checkMatch} />
        </div>
      </div>
    </>
  );
};

export default CourseHead;
