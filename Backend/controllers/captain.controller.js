const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');

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