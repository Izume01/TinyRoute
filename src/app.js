import express from 'express'
import dotenv from 'dotenv'
import connectDb from './connectDB';

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DATABASE_URL; 

connectDb(dbUrl);


app.listen(port ,()=> {
    console.log('Server started')
})