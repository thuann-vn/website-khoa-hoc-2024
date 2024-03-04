
import CourseDetails from "../../data/course-details/courseData.json";
import { Link } from '@inertiajs/react'
import { currency, getImageStoragePath } from '@/helper'
import CardSingle from '@/Components/Cards/CardSingle.jsx'

const Card = ({ courses, col, mt, isDesc, isUser  }) => {
  return (
    <>
      {courses.map((data, index) => (
          <div
            className={`${col} ${mt}`}
            data-sal-delay="150"
            data-sal="slide-up"
            data-sal-duration="800"
            key={index}
          >
            <CardSingle data={data} isDesc={isDesc} isUser={isUser}/>
          </div>
        ))}
    </>
  );
};

export default Card;
