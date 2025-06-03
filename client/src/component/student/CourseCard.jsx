import React from 'react';
import { assets } from '../../assets/assets';
import { ShareData } from '../../context/Appcontext';
import { Link } from 'react-router';

function CourseCard({ course }) {
  const { currency ,calculatingRating} = ShareData();
  const price = (course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2);

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="group w-[1500px] max-w-xs bg-[#fff] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1"
    >
      {/* صورة الكورس */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* محتوى الكارت */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition">
          {course.courseTitle}
        </h3>
        <p className="text-sm text-gray-500">{course.educator.name}</p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-sm font-semibold">{calculatingRating(course)}</span>
            <div className="flex gap-[2px]">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i<Math.floor(calculatingRating(course))?assets.star:assets.star_blank} alt="star" className="w-4 h-4 animate-fadeInStar" />
              ))}
            </div>
          </div>
          <span className="text-xs text-gray-400">{course.courseRatings.length}</span>
        </div>

        <div className="mt-2">
          <span className="text-lg font-bold text-blue-600">{currency} {price}</span>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
