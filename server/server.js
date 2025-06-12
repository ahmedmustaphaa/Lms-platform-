import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectedDb } from './configs/mongooDb.js';
import { clerkWebHooks, stripeWebHooks } from './controller/webHook.js';
import educatorRouter from './routes/educatorRoute.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinarty.js';
import courseRouter from './routes/courseRoute.js';
import UserRouter from './routes/userRoute.js';

const app = express();

// 📌 connect DB & cloudinary
await connectedDb();
await connectCloudinary();

// 📌 middleware
app.use(cors());
app.use(clerkMiddleware());

// 📌 Clerk webhook: لازم يكون قبل express.json()
app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebHooks);

// 📌 باقي middleware
app.use(express.json());

// 📌 routes
app.use('/api/educator', educatorRouter);
app.use('/api/course', courseRouter);
app.use('/api/user', UserRouter);
app.post('/stripe', stripeWebHooks);

// 📌 default route
app.get('/', (req, res) => {
  res.send("✅ API working successfully");
});

// 📌 start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("✅ Server running on port " + port);
});
