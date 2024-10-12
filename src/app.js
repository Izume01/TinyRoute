import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './connectDB.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const dbUrl = process.env.DATABASE_URL || "mongodb+srv://shrey16211:Shrey123@tiny.zye1l.mongodb.net/?retryWrites=true&w=majority&appName=Tiny"; 

connectDB(dbUrl);

// Get the current directory name equivalent to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public'))); // Serve public files
// Serve static files from the "resources" directory
app.use('/resources', express.static(path.join(__dirname, '../resources'))); // Serve resources files

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html')); // Adjusted path
});

// Add the URL routes to the app
app.use('/api', urlRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
