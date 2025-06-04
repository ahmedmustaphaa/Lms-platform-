import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectedDb } from './configs/mongooDb.js';
import { clerkWebHooks } from './controller/webHook.js';

const app = express();

// ✅ Connect to MongoDB
await connectedDb();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // لباقي الراوتات فقط

// ✅ Webhook لازم raw body
app.post('/clerk', bodyParser.raw({ type: 'application/json' }), clerkWebHooks);

// ✅ Test Route
app.get('/', (req, res) => {
  res.send("API working successfully");
});

// ✅ Start Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("✅ Server running on port " + port);
});
