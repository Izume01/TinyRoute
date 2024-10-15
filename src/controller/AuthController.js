import User from "../model/user.js";
import generateSessionId from "../util/generateSessionId.js";

const handleRegistration = async (req, res) => {
    const { name, email, password } = req.body; 
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }    
    try {

        // const existingUser = await User.findOne({email});
        // if(existingUser){
        //     existingUser.sessionIds.push(sessionId);
        //     return res.status(400).json({ message: "User already exists." });
        // }
        const newSessionId = generateSessionId();

        const newUser = new User({
            name,
            email,
            password,
            sessionIds: [newSessionId]
        });
        await newUser.save();

        return res.status(201).json({ message: "User created successfully" ,sessionId : newSessionId});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const handleLogin = async (req, res) => {
    const { email, password , sessionId  } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (sessionId && user.sessionIds.includes(sessionId)) {
            return res.status(200).json({ message: "Login successful", sessionId });
        } else {
            // Generate a new session ID if none provided or not found
            const newSessionId = generateSessionId();
            user.sessionIds.push(newSessionId);
            await user.save();
            return res.status(200).json({ message: "Login successful", sessionId: newSessionId });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { handleRegistration, handleLogin };
