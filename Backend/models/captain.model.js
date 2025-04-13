const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname:{
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
        lowercase:true, //isse email lowercase mein store hoga
        match:[/^\S+@\S+\.\S+$/,'Please enter a valid email address'], //email ki validation ke liye
    },
    password:{
        type:String,
        required:true,
        select:false, //isse jbb bhi hmm user ko id se find krenge toh yeah password nhi jaayega response mein
    }, 
    socketId:{ //for showig the user live location or tracking of the driver on the map
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive',], //active means voh free hai ride le skta hai voh aur inactive means voh kisi ride mein hai toh voh ride nahi le sakta hai
        default:'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color should be atleast 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate should be atleast 3 characters long'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity should be atleast 1'],
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['motorcycle','car','auto'],
        },
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
});


captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){ //yha hmm db mein store password ko abb waale password se compare krvaarhe hai
    return await bcrypt.compare(password,this.password); //password db mein alg treeke se store hota hai isliye pehle bcrypt krenge fir comapre krva rhe hai
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10); //10 is the number of rounds for hashing
}


const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;


