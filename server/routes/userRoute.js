import express from 'express';
import { getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledData } from '../controller/UserContoller.js';




const UserRouter=express.Router();

UserRouter.get('/data',getUserData);
UserRouter.post('/purchase',purchaseCourse);
UserRouter.get('/enrolled-courses',userEnrolledData);
UserRouter.post('/update-course-progress',updateUserCourseProgress);
UserRouter.get('/get-course-progress',getUserCourseProgress);


export default UserRouter;