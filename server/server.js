import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectedDb } from './configs/mongooDb.js';

import educatorRouter from './routes/educatorRoute.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinarty.js';
import courseRouter from './routes/courseRoute.js';
import UserRouter from './routes/userRoute.js';
import { userModel } from './models/user.js';
import { Webhook } from 'svix';

const app = express();
await connectedDb();
await connectCloudinary();

// ⚠️ لازم تحط ده قبل أي middleware يعدّل البودي
app.post('/clerk', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(req.body, {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    });

    const { type, data } = evt;
    console.log("🔔 Clerk Webhook Event:", type);
    console.log("📦 Data:", data);

    switch (type) {
      case 'user.created':
        await userModel.create({
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || '',
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          imageUrl: data.image_url || '',
        });
        break;

      case 'user.updated':
        await userModel.findByIdAndUpdate(data.id, {
          email: data.email_addresses?.[0]?.email_address || '',
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          imageUrl: data.image_url || '',
        });
        break;

      case 'user.deleted':
        await userModel.findByIdAndDelete(data.id);
        break;

      default:
        console.log("ℹ️ Unhandled event type:", type);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Clerk Webhook Error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});

// ✅ بعد الـ /clerk raw middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// ✅ باقي routes
app.use('/api/educator', educatorRouter);
app.use('/api/course', courseRouter);
app.use('/api/user', UserRouter);


// ✅ default route
app.get('/', (req, res) => {
  res.send("✅ API working successfully");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("✅ Server running on port " + port);
});
