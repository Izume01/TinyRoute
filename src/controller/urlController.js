import Url from '../model/url.js'; // Import Url model
import { GenerateRandomString } from '../util/slugGenerator.js'; // Import GenerateRandomString

// Function to create a new short URL
const CreateShortUrl = async (req, res) => {
    console.log('Request body:', req.body); // Add this line for debugging
    const { originalUrl } = req.body;
    if (!originalUrl) {
        return res.status(400).json({ message: "originalUrl is required" });
    }
    const slug = GenerateRandomString();
    const date = Date.now(); // Corrected Date assignment
    try {
        const newUrl = new Url({
            originalUrl,
            slug,
            date 
        });
        await newUrl.save();
        res.status(201).json({ slug });
    } catch (error) {
        console.error('Error saving new URL:', error); // Log the error details
        res.status(500).json({ message: error.message });
    }
};

const GetOriginalUrl = async (req, res) => {
    const { slug } = req.params;
    try {
        const urlEntry = await Url.findOne({ slug });
        if (urlEntry) {
            res.redirect(urlEntry.originalUrl);
        } else {
            res.status(404).json({ message: "URL not found" });
        }
    } catch (error) {
        console.error('Error retrieving URL:', error); // Log the error details
        res.status(500).json({ error: 'Server error' }); // Handle server errors
    }
};

export { CreateShortUrl, GetOriginalUrl };
