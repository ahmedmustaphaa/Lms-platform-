import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectedDb } from './configs/mongooDb.js';
import { clerkWebHooks } from './controller/webHook.js';

const app = express();

await connectedDb();

app.use(cors());
app.use(express.json()); // فقط لباقي الراوتات

app.get('/', (req, res) => {
  res.send("API working successfully");
});

// Webhook لازم raw
app.post('/clerk', bodyParser.raw({ type: 'application/json' }), clerkWebHooks);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("✅ Server running on port " + port);
});
