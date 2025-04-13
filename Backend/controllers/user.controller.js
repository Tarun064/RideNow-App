const userModel = require('../models/user.model.js');
const userService = require('../services/user.service.js');
const {validationResult} = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model.js')

module.exports.registerUser = async (req,res,next)=>{
    const errors = validationResult(req); //isme errors aayenge jo route mein validate honge
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}); //message array ki form mein aa jaayega
    }

    const {fullname,email,password} = req.body;

    const isUserAlready = await userModel.findOne({email});  //to check weather this email already exist or not

    if(isUserAlready){
        return res.status(400).json({message:"User already exists"});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token,user});

}

module.exports.loginUser = async (req,res,next)=>{
    const errors = validationResult(req); //isme errors aayenge jo route mein validate honge
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}); //message array ki form mein aa jaayega
    }
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('+password'); //yha hmm password bhi chahte hai toh select krna padega kyunki hmne model ko by default kisi bhi query ke liye passsword false krr rkha hia jisse password nhi aayega but hmme yhaa password chahiye kyunki login krbvana bhai naa

    if(!user){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const isMatch = await user.comparePassword(password); //yha hmm password ko compare krne ke liye service mein jaayenge

    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const token = user.generateAuthToken(); //yha hmm token generate krne ke liye model mein jaayenge

    res.cookie('token',token); //yha hmm cookie mein token set krr rhe hai taaki cookie se login user ko identify krr paaye

    res.status(200).json({token,user}); 
}

module.exports.getUserProfile = async (req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({token});

    res.status(200).json({message:'Logged out'});
}