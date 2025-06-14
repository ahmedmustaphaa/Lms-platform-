
import CouserModel from "../models/course.js";
import { CourseProgress } from "../models/coursePrograms.js";
import { Puraches } from "../models/purchase.js";
import { userModel } from "../models/user.js";
import stripe, { Stripe } from 'stripe'
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId; // دا الـ Clerk ID

    const user = await userModel.findOne({ _id: userId }); // ✅ استخدم findOne

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const userEnrolledData = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const userData = await userModel.findById(userId).populate({
      path: 'enrolledCourses',
    
    });

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: userData.enrolledCourses
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const purchaseCourse = async (req, res) => {
  try {
    const { courseId, origin } = req.body;
    const userId = req.auth.userId;

    const userData = await userModel.findById(userId);
    const courseData = await CouserModel.findById(courseId);

    if (!userData || !courseData) {
      return res.status(404).json({
        success: false,
        message: "User or course not found.",
      });
    }

    const amount = (courseData.coursePrice - (courseData.discount * courseData.coursePrice / 100)).toFixed(2);

    const purchaseData = {
      userId,
      courseId: courseData._id,
      amount: parseFloat(amount),
      origin,
    };

    const newPurchase = await Puraches.create(purchaseData);

    const stribeInstance=new Stripe(process.env.STRIPE_SECRET_KEY);

 const line_items = [
  {
    price_data: {
      currency: 'usd',
      product_data: {
        name: courseData.courseTitle,
      },
      unit_amount: Math.floor(newPurchase.amount * 100), // تأكد من ضرب القيمة قبل التقريب
    },
    quantity: 1,
  }
];

const session = await stripeInstance.checkout.sessions.create({
  success_url: `${origin}/loading/my-enrollments`,
  cancel_url: `${origin}/loading/my-enrollments`,
  line_items,
  mode: 'payment',
  metadata: {
    purchaseId: newPurchase._id.toString()
  }
});

    return res.status(201).json({
      success: true,
      message: "Course purchased successfully.",
      data: newPurchase,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId; // ✅ corrected "consr" to "const"

    const { courseId, lectureId } = req.body; // ✅ fixed typo: eureId → lectureId

    if (!userId || !courseId || !lectureId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Find existing progress record
    let progress = await CourseProgress.findOne({ userId, courseId });

    // ✅ If no progress exists, create a new one
    if (!progress) {
      progress = await CourseProgress.create({
        userId,
        courseId,
        lectureCompleted: [lectureId],
        completed: false,
      });
    } else {
      // ✅ Add lectureId if not already marked as completed
      if (!progress.lectureCompleted.includes(lectureId)) {
        progress.lectureCompleted.push(lectureId);
      }

      // ✅ Optional: mark as completed if all lectures are done (requires total lectures info)
      // Example: progress.completed = progress.lectureCompleted.length === totalLectures;

      await progress.save();
    }

    res.status(200).json({ message: "Progress updated", progress });
  } catch (error) {
    console.error('❌ Error updating course progress:', error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId; // ✅ Assuming authentication middleware sets this
    const { courseId } = req.params;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "Missing userId or courseId" });
    }

    const progress = await CourseProgress.findOne({ userId, courseId });

    if (!progress) {
      return res.status(404).json({ message: "No progress found for this course" });
    }

    res.status(200).json({ progress });
  } catch (error) {
    console.error('❌ Error fetching course progress:', error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
