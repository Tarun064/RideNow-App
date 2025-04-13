const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.post('/register',
    [body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name should be atleast 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color should be atleast 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate should be atleast 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity should be atleast 1'),
    body('vehicle.vehicleType').isIn(['motorcycle','car','auto']).withMessage('Vehicle type should be either motorcycle, car or auto')
], //yha hmm vehicle ki validation bhi krwa rahe hai
    captainController.registerCaptain); //yha jo bhi error aayega validation ke time toh sirf btata hai but agr uss error pe hmme action perform krna hai toh voh krenge uske saath use kiye hua controller ke andr, aur usme use krenge hmm validationResult.

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),  //yeah validation ho rhi hai (express vbalidator se)
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 characters long')
],captainController.loginCaptain); 

router.get('/profile', authMiddleware.authCaptain ,captainController.getCaptainProfile); //yha hmm user ka profile dekhne ke liye route bana rahe hai

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);


module.exports = router;