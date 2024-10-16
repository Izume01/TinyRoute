import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './connectDB.js';
import urlRoutes from './routes/urlRoutes.js';
import auth from './routes/auth.js';
import { LoginCheck } from './middleware/loginCheck.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const dbUrl = process.env.DATABASE_URL; 
console.log(dbUrl);

connectDB(dbUrl);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../public'))); 
app.use('/resources', express.static(path.join(__dirname, '../resources')));



app.get('/' ,(req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html')); // Adjusted path
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html')); // Adjusted path
});
app.get('/sigup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'signup.html')); // Adjusted path
});


app.use('/api', urlRoutes);
app.use('/auth', auth);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
