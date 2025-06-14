import {clerkClient} from '@clerk/express'
import CouserModel from '../models/course.js';
import cloudinary from 'cloudinary'
import { userModel } from '../models/user.js';
import { Puraches } from '../models/purchase.js';

export const updateRoleToEducator = async (req, res) => {
  try {
    const { userId } = req.auth();


   

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'educator',
      },
    });

    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;

    // لو بتستخدم clerk: استدعي req.auth() كدالة
    const auth = req.auth ? req.auth() : null;
    const educatorId = auth?.userId;

    if (!imageFile) {
      return res.status(400).json({ message: "Thumbnail not attached", success: false });
    }

    if (!courseData) {
      return res.status(400).json({ message: "courseData is required", success: false });
    }

    // parse نص JSON إلى كائن
    const parsedData = JSON.parse(courseData);

    // أضف معرف المعلم
    parsedData.educator = educatorId;

    // رفع الصورة إلى Cloudinary
    const imageUpload = await cloudinary.v2.uploader.upload(imageFile.path);

    // حفظ رابط الصورة في بيانات الدورة
    parsedData.courseThumbnail = imageUpload.secure_url;

    // استيراد الموديل الصحيح CourseModel
    const newCourse = await CouserModel.create(parsedData);

    // الرد بنجاح العملية
    res.status(201).json({ success: true, message: "Course added successfully", course: newCourse });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};


export const getEducator=async(req,res)=>{
      try{

        const educator=req.auth.userId;
        const getEducatorData=await CouserModel.find({educator});


    if(!getEducatorData){
        return res.send({message:"not data exists" ,success:false})
    }

    res.send ({success:true ,message:"all courses retreived successfully",getEducatorData})
      }catch(error){
        res.send({message:error.message,success:false})
      }
}


//  get educator dashboarddata



export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;

    // 1. هات الكورسات الخاصة بالمعلم
    const courses = await CourseModel.find({ educator });

    const totalCourses = courses.length;

    const courseIds = courses.map(course => course._id);

    // 2. هات المشتريات المكتملة
    const completedPurchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    });

    const totalEarnings = completedPurchases.reduce((sum, purchase) => {
      return sum + purchase.amount;
    }, 0);

    // 3. هات الطلاب المسجلين في كل كورس
    const enrolledStudentData = [];

    for (const course of courses) {
      const students = await userModel.find({
        _id: { $in: course.enrolledStudent || [] },
      }).select('name imageUrl');

      enrolledStudentData.push({
        courseId: course._id,
        courseTitle: course.title,
        students,
      });
    }

    // 4. إرسال البيانات النهائية
    return res.status(200).json({
      totalCourses,
      totalEarnings,
      enrolledStudentData,
    });

  } catch (error) {
    console.error('Educator Dashboard Error:', error);
    return res.status(500).json({ message: 'خطأ في السيرفر الداخلي' });
  }
};


// get enrollled student data with enrolled data ;
export const getEnrolledStudentsData=async (req,res)=>{
    try{
         const educator=req.auth.userId;
         const courses=await CouserModel.find({educator});

         const coursesId=courses.map(course=>course._id);
         const purchases=await purchase.find({
            courseId:{$in :coursesId},
            status:'completed'
         }).populate('userId','name imageUrl').populate('courseId','courseTitle');


         const enrolledStudent=purchases.map(purchas=>({
            student:purchas.userId,
            courseTitle:purchas.courseId.courseTitle,
            purchasesDate:purchas.createdAt,
         }))

         res.json({success:true,enrolledStudent})

    }catch(error){
    return res.status(500).json({ message: 'خطأ في السيرفر الداخلي' });
    }
}