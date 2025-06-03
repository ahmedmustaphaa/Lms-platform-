import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser'; // ✅
import { connectedDb } from './configs/mongooDb.js';
import { clerkWebHooks } from './controller/webHook.js';

const app = express();

app.use(cors());
app.use(express.json()); // لباقي الراوتات

await connectedDb();

app.get('/', (req, res) => {
  res.end("API working successfully");
});

// ✅ لازم تستخدم raw middleware هنا بس
app.post('/clerk', bodyParser.raw({ type: 'application/json' }), clerkWebHooks);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("✅ Server running successfully on port", port);
});
