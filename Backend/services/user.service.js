// yha hmm user ke liye service create krrenge kyunki yhaa hmm mongodb se baat krr rhe hai jo ki ek khi alg kgh bdda hai db
// toh usse interact krne ke liye hmm service create krenge'

const userModel = require('../models/user.model.js');

module.exports.createUser = async({firstname,lastname,email,password})=>{
    if(!firstname || !email || !password){
        throw new Error("All fields are required");
    }

    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}