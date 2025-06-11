import express from 'express';
import { getUserData, purchaseCourse, userEnrolledData } from '../controller/UserContoller.js';



const UserRouter=express.Router();

UserRouter.get('/data',getUserData);
UserRouter.post('/purchase',purchaseCourse);
UserRouter.get('/enrolled-courses',userEnrolledData);


export default UserRouter;