import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectedDb } from './configs/mongooDb.js';
import { clerkWebHooks } from './controller/webHook.js';

const app = express();

await connectedDb();

app.use(cors());
app.use(express.json()); // ✅ استخدم JSON Middleware الطبيعي

// ✅ Webhook route بدون raw مؤقتًا
app.post('/clerk', clerkWebHooks);

app.get('/', (req, res) => {
  res.send("API working successfully");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("✅ Server running on port " + port);
});
