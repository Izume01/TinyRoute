import express from 'express';
import dotenv from 'dotenv';

import connectDB from './connectDB.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DATABASE_URL; 

connectDB(dbUrl);

app.use(express.json());
app.use('/api', urlRoutes);


app.listen(port ,()=> {
    console.log('Server started')
})