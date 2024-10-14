import User from "../model/user.js";
import mongoose from "mongoose";

export function LoginCheck(req, res , next) {
    if(!localStorage.getItem('sessionId')){
        return res.status(401).json({message: "Unauthorized"});
    }
    for(let i = 0 ; i < localStorage.getItem('sessionId').length ; i++) {
        if(localStorage.getItem('sessionId')[i] === req.headers.authorization){
            return next();
        }
    }
}