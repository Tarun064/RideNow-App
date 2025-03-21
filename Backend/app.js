const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); //abhi ke liye abhi ko access denge but baad mein production mein sirf apna domain hi access karega
//aur baaki sbb ko block kar dega; isliye cors use karte hain.
app.get('/', (req, res)=>{
    res.send("Hello World");
});

module.exports=app;