const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

//sbse pehle hmm agr register user krne ke liye route bnaayenge toh sbse pehle usse validate krna hoga ki yeah jo data
// mere pass aa rha hai voh valid hai yaa nhi toh uske liye mein ek package install epxress-validator


// array ke andr body mein jo sbb  likha hai mtlb sequence of callback
router.post('/register',[body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name should be atleast 3 characters long'),
    ,body('password').isLength({min:6})],userController.registerUser);


module.exports = router;