import React, { createContext, useContext, useEffect, useState } from 'react';
import { dummyCourses } from '../assets/assets';
import { useNavigate } from 'react-router';
import humanizeDuration from 'humanize-duration';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';

const appContextProvider = createContext();

function Appcontext({ children }) {
  const currency = import.meta.env.VITE_CURRENCY;

  const [allcourses, setAllCourses] = useState([]);
  const [IsEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser(); // ✅ important!

  // ✅ Only log when user is ready
  useEffect(() => {
    if (isLoaded && user) {
      console.log("✅ User ID:", user.id);
    }
  }, [isLoaded, user]);

  const fetchUserEnrolledCourses = async () => {
    // ⛔ لم يتم تنفيذه بعد
  };

  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/course/all');
      console.log("📦 All Courses:", data);

      if (data.success) {
        setAllCourses(data.data);
      }
    } catch (error) {
      console.error("❌ Error fetching courses:", error.response?.data || error.message);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/user/data', {
        headers: {
           'Authorization': `Bearer ${token}`
        }
      });

      console.log("📦 All user:", data);

      if (data.success) {
        setUserData(data.data);
      }
    } catch (error) {
      console.error("❌ Error fetching users:", error.response?.data || error.message);
    }
  };

  const calculatingRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }

    let totalRating = 0;
    course.courseRatings.forEach(element => {
      totalRating += element.rating;
    });

    return totalRating / course.courseRatings.length;
  };

  const calcChapterTime = (chapter) => {
    let time = 0;

    if (Array.isArray(chapter.chapterContent)) {
      chapter.chapterContent.forEach((lecture) => {
        time += lecture.lectureDuration;
      });
    }

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"], round: true });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;

    if (Array.isArray(course.coursecontent)) {
      course.coursecontent.forEach((chapter) => {
        if (Array.isArray(chapter.chapterContent)) {
          chapter.chapterContent.forEach((lecture) => {
            time += lecture.lectureDuration;
          });
        }
      });
    }

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"], round: true });
  };

  const calculateNumberOfLectures = (course) => {
    let totalLectures = 0;

    if (Array.isArray(course.coursecontent)) {
      course.coursecontent.forEach((chapter) => {
        if (Array.isArray(chapter.chapterContent)) {
          totalLectures += chapter.chapterContent.length;
        }
      });
    }

    return totalLectures;
  };

const fetchToken = async () => {
  const newToken = await getToken();
  console.log("🪪 Auth Token:", newToken);
  setToken(newToken);
};

  // ✅ Fetch token once user is ready
  useEffect(() => {
    if (isLoaded && user) {
      fetchToken();
    }
  }, [isLoaded, user]);

  // ✅ Fetch other data only after token is ready
  useEffect(() => {
    if (token) {
      fetchAllCourses();
      fetchUserEnrolledCourses();
      fetchAllUsers();
    }
  }, [token]);

  const val = {
    currency,
    enrolledCourses,
    allcourses,
    navigate,
    calculatingRating,
    IsEducator,
    setIsEducator,
    calcChapterTime,
    calculateCourseDuration,
    calculateNumberOfLectures
  };

  return (
    <appContextProvider.Provider value={val}>
      {children}
    </appContextProvider.Provider>
  );
}

export const ShareData = () => {
  return useContext(appContextProvider);
};

export default Appcontext;
