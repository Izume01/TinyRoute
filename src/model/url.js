import mongoose from "mongoose";


const urlScheme = new mongoose.Schema({
    originalUrl : {
        type : String ,
        required : true , 
        validate: {
            validator: function(v) {
                return /^https?:\/\/.+/.test(v);
            },
            message: props => `${props.value} is not a valid URL!` // Error message if validation fails
        } 
    }, 
    slug : {
        type:String ,
        required : true,
        unique : true}, 
    createAt : {
        type:Date ,
        default: Date.now} 
})

const Url = mongoose.model("Url" , urlScheme);

export default Url;