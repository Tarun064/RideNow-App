const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

//sbse pehle hmm agr register user krne ke liye route bnaayenge toh sbse pehle usse validate krna hoga ki yeah jo data
// mere pass aa rha hai voh valid hai yaa nhi toh uske liye mein ek package install epxress-validator


// array ke andr body mein jo sbb  likha hai mtlb sequence of callback
router.post('/register',
    [body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name should be atleast 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 characters long')],
    userController.registerUser); //yha jo bhi error aayega validation ke time toh sirf btata hai but agr uss error pe hmme action perform krna hai toh voh krenge uske saath use kiye hua controller ke andr, aur usme use krenge hmm validationResult. 

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),  //yeah validation ho rhi hai (express vbalidator se)
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 characters long')
],userController.loginUser); //yha bhi wahi hoga jo register mein kiya hai

router.get('/profile', authMiddleware.authUser ,userController.getUserProfile); //yha hmm user ka profile dekhne ke liye route bana rahe hai

router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;