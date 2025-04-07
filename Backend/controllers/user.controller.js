const userModel = require('../models/user.model.js');
const userService = require('../services/user.service.js');
const {validationResult} = require('express-validator');

module.exports.registerUser = async (req,res,next)=>{
    const errors = validationResult(req); //isme errors aayenge jo route mein validate honge
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}); //message array ki form mein aa jaayega
    }

    const {fullname,email,password} = req.body;

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

    res.status(200).json({token,user}); 
}