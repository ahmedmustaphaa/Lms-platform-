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

await connectedDb();

app.use(cors());
app.use(clerkMiddleware())

await connectCloudinary();
app.use(express.json()); // ✅ استخدم JSON Middleware الطبيعي


app.post('/clerk', clerkWebHooks);
app.use('/api/educator',express.json(),educatorRouter)
app.use('/api/course',courseRouter)
app.use('/api/user',UserRouter);

app.post('/stripe',stripeWebHooks)
app.get('/', (req, res) => {
  res.send("API working successfully");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("✅ Server running on port " + port);
});
    