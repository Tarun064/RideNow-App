const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model.js')

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req); //isme errors aayenge jo route mein validate honge
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //message array ki form mein aa jaayega
    }

    const { fullname, email, password, vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });  //to check weather this email already exist or not

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req); //isme errors aayenge jo route mein validate honge
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //message array ki form mein aa jaayega
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password'); //yha hmm password bhi chahte hai toh select krna padega kyunki hmne model ko by default kisi bhi query ke liye passsword false krr rkha hia jisse password nhi aayega but hmme yhaa password chahiye kyunki login krbvana bhai naa
    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await captain.comparePassword(password); //yha hmm password ko compare krne ke liye service mein jaayenge   
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = captain.generateAuthToken(); 

    res.cookie('token', token);
    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    const captain = req.captain; //yha hmm captain ko middleware se le rhe hai jo ki authMiddleware mein hai
    res.status(200).json({ captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; //yha hmm token ko middleware se le rhe hai jo ki authMiddleware mein hai
    await blackListTokenModel.create({ token }); //yha hmm token ko blacklist krne ke liye create kr rahe hai taaki voh token use na ho sake
    
    res.clearCookie('token'); 

    res.status(200).json({ message: "Logged out successfully" });
}