const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; //header mein jo token ata hai voh authorization(key) mein aati hai with value bearer token industry mein issi trh hi use hota hai
    if(!token){  //token cookie se niklwaane ke liye hmm ek middleware use krte hai jo interact krta hai server mein tohh uske ke liye ek package install krenge cookie-parser
        return res.status(401).json({message:"Unauthorized"});
    }

    const isBlackListed = await blackListTokenModel.findOne({token:token});  //have to check i think we have to check in blacklist model

    if(isBlackListed){  //to verify agr user blacklisted ho gya hai toh hmm sidha retun krr denge msg ke saath islye kyunki clear cookie cgrh krne ke baad bhi kyi baar user apne local storage mein khi aur store krliya ho token ya kisi ko share kr diay ho cookie toh uske liye
        return res.status(401).json({message:'Unauthorized'});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET); //decoded mein hmme sirf vhi data milega jo hmne token create krte vkt set kiya tha
        const user = await userModel.findById(decoded._id);

        req.user=user;
        return next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized"});
    }
}

module.exports.authCaptain = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; 
    if(!token){  
        return res.status(401).json({message:"Unauthorized"});
    }

    const isBlackListed = await blackListTokenModel.findOne({token:token});  //have to check i think we have to check in blacklist model

    if(isBlackListed){  //to verify agr user blacklisted ho gya hai toh hmm sidha retun krr denge msg ke saath islye kyunki clear cookie cgrh krne ke baad bhi kyi baar user apne local storage mein khi aur store krliya ho token ya kisi ko share kr diay ho cookie toh uske liye
        return res.status(401).json({message:'Unauthorized'});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET); //decoded mein hmme sirf vhi data milega jo hmne token create krte vkt set kiya tha
        const captain = await captainModel.findById(decoded._id);

        req.captain=captain;
        return next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized"});
    }
}