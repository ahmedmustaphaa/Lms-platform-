import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'; 

function Rating({ initialRating = 0, onRate }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onRate) onRate(value); 
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1;
          const isActive = starValue <= (hover || rating);

          return (
            <FaStar
              key={index}
              size={28}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              className={`transition-all duration-200 cursor-pointer drop-shadow-sm ${
                isActive ? 'text-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-300'
              }`}
            />
          );
        })}
      </div>

      <div className="text-sm text-gray-600 font-medium">
        {rating === 0
          ? 'اضغط لتقييم الدورة'
          : `تقييمك: ${rating} من 5 ⭐`}
      </div>
    </div>
  );
}

export default Rating;
