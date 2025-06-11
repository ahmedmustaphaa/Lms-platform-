import CouserModel from "../models/course.js";

// Get All Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await CouserModel.find({ isPublished: true })
      .select(['-enrolledStudent', '-courseContent']) // استبعاد الحقول الثقيلة
      .populate({
        path: 'educator',
      
      });

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const getCourseId = async (req, res) => {
  const { id } = req.params;

  try {
    const courseData = await CouserModel.findById(id).populate({
      path: 'educator',
  
    });

    if (!courseData) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // إزالة روابط الفيديو إذا لم تكن المعاينة مفعّلة
    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.lectureIsPreview) {
          lecture.lectureUrl = '';
        }
      });
    });

    res.status(200).json({ success: true, data: courseData });

  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
