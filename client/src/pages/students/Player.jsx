import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import humanizeDuration from 'humanize-duration';
import { ShareData } from '../../context/Appcontext';
import { assets } from '../../assets/assets'; // Ensure this exists and includes down_arrow_icon, play_icon
import YouTube from 'react-youtube';
import Footer from '../../component/student/Footer';
import Rating from '../../component/student/Rating';

function Player() {
  const { enrolledCourses, calcChapterTime } = ShareData();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const course = enrolledCourses.find((course) => course._id === courseId);
    if (course) setCourseData(course);
  }, [courseId, enrolledCourses]);

  const toggleChapter = (index) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
    <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
      {/* Left */}
      <div className="text-gray-600">
        <h1 className="text-xl font-semibold">Course Structure</h1>
        <div className="space-y-6">
          {courseData?.courseContent?.map((chapter, index) => {
            const isExpanded = expandedChapters[index];

            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-4 transition-all duration-500 ease-in-out"
              >
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleChapter(index)}
                >
                  <img
                    src={assets.down_arrow_icon}
                    alt="Toggle"
                    className={`w-4 h-4 transform transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                  <p className="font-semibold text-gray-800">
                    {chapter.chapterTitle}
                  </p>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {chapter.chapterContent.length} محاضرات –{' '}
                  {calcChapterTime(chapter)}
                </p>

                {/* Lectures */}
                {isExpanded && (
                  <div className="overflow-hidden transition-all duration-300 max-h-96 mt-2">
                    <ul className="space-y-2">
                      {chapter.chapterContent.map((lecture, i) => (
                        <motion.li
                          key={`${index}-${i}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="flex gap-3 items-start bg-gray-50 p-3 rounded-xl shadow-sm hover:bg-gray-100 transition"
                        >
                          <img
                            src={assets.play_icon}
                            className="w-5 h-5 mt-1"
                            alt="Play Icon"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {lecture.lectureTitle}
                            </p>
                            <div className="flex gap-4 text-sm text-gray-500 mt-1">
                              {lecture.lectureUrl && (
                                <p
                                  className="text-green-600 font-medium cursor-pointer"
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl.split('/').pop(),
                                    })
                                  }
                                >
                                  watch
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ['h', 'm'] }
                                )}
                              </p>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <Rating/>
      </div>
   <div>
  {playerData ? (
    <div>
      <YouTube
        videoId={playerData.videoId} // تأكد أن `playerData` فيه key اسمه `videoId`
        iframeClassName="w-full aspect-video"
      />
      <div className="mt-4">
        <p className="text-lg font-semibold">
          {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
        </p>
        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
         {false ?"completed" :"mark complete"}
        </button>
      </div>
    </div>
  ) : (
    <img
      src={courseData ? courseData.courseThumbnail : ''}
      alt="Course Thumbnail"
      className="w-full rounded-xl shadow"
    />
  )}
</div>

    </div>
    <Footer/>
    </div>
  );
}

export default Player;
