const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name should be atleast 3 characters long'],
        },
        lastname:{
            type:String,
            minlength:[3,'Last name should be atleast 3 characters long'],
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[6,'Email should be atleast 6 characters long'],
    },
    password:{
        type:String,
        required:true,
        select:false, //isse jbb bhi hmm user ko id se find krenge toh yeah password nhi jaayega response mein
    },
    socketId:{ //for showig the user live location or tracking of the driver on the map
        type:String,
    }

},{timestamps:true});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.matchPassword = async function(password){ //yha hmm db mein store password ko abb waale password se compare krvaarhe hai
    return await bcrypt.compare(password,this.password); //password db mein alg treeke se store hota hai isliye pehle bcrypt krenge fir comapre krva rhe hai
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,12); //12 is the number of rounds for hashing
}
const User = mongoose.model('User', userSchema);

module.exports = User;

//abb yha hmne ek user ka schema or model bnaa diya jis se hmme yeah ptaa chlega ki kyaa kyaa data hmmlenge user se
// kis trh data store krr rhe hai
// fir hmm routes bhi likhenge but route se pehle hmme user ka controller likhna pdega jisse specific route ke liye 
// jo specific kaam krna hai usska logic controller mein hona chahiye
// aur fir routes mein controller ko call krke uska kaam krvaayenge 