import User from "../model/user.js";
const handleRegistration = async(req ,res) => {
    const {name , email , password} = req.body; 
    console.log(name , email , password);
    
    if(!name || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const NewUser = new User({
            name,
            email,
            password
        })
        await NewUser.save();
        return res.status(201).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const handleLogin = async(req, res) => {
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        if(user.password !== password){
            return res.status(401).json({message: "Invalid credentials"});
        }
        return res.status(200).json({message: "Login successful"});
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}

export {handleRegistration , handleLogin};