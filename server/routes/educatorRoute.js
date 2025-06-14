import express from 'express';
import { addCourse, educatorDashboardData, getEducator, getEnrolledStudentsData, updateRoleToEducator } from '../controller/educatorController.js';
import upload from '../configs/multer.js';
import { protectedEducator } from '../middelware/autumiddleware.js';
const educatorRouter = express.Router();

educatorRouter.get('/update-role', updateRoleToEducator);
educatorRouter.get('/get-courses', getEducator);
educatorRouter.post('/add-course', upload.single('image'), protectedEducator, addCourse);
educatorRouter.post('/dashboard',  protectedEducator, educatorDashboardData);
educatorRouter.post('/enrolled-student',  protectedEducator, getEnrolledStudentsData);

export default educatorRouter;
