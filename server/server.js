import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import { connectedDb } from './configs/mongooDb.js';
import { clerkWebHooks } from './controller/webHook.js';

const app=express();
app.use(express.json());

app.use(cors());


await connectedDb()

app.get('/',(req,res)=>{

})

app.post('/clerk',express.json(),clerkWebHooks)

const port=4000;


app.listen(port,()=>{
    console.log("server running successfully")
})