
import CourseBreadcrumb from "./Course-Breadcrumb";

const CourseHead = ({ checkMatch }) => {
  return (
    <>
      <div className="breadcrumb-inner">
        <img src={"/images/bg/bg-image-10.jpg"} alt="Education Images" />
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
