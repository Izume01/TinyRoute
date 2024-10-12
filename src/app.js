import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './connectDB.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DATABASE_URL; 

connectDB(dbUrl);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Add the URL routes to the app
app.use('/api', urlRoutes);

app.listen(port, () => {
    console.log('Server started');
});